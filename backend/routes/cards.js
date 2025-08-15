const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get user cards
router.get('/', verifyToken, async (req, res) => {
    try {
        const cards = await database.query(
            `SELECT id, type, number, holder_name, expiry_month, expiry_year, 
                    is_default, is_active, created_at 
             FROM cards 
             WHERE user_id = ? AND is_active = 1 
             ORDER BY is_default DESC, created_at DESC`,
            [req.user.id]
        );

        // Mask card numbers for security
        const maskedCards = cards.map(card => ({
            ...card,
            number: `${card.number.slice(0, 4)} **** **** ${card.number.slice(-4)}`,
            cvv: '***'
        }));

        res.json({
            success: true,
            cards: maskedCards
        });

    } catch (error) {
        console.error('Get cards error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get cards'
        });
    }
});

// Add new card
router.post('/', verifyToken, [
    body('type').isIn(['Visa', 'Mastercard', 'American Express', 'Discover', 'visa', 'mastercard', 'american_express', 'discover']).withMessage('Invalid card type'),
    body('number').isLength({ min: 16, max: 16 }).isNumeric().withMessage('Card number must be 16 digits'),
    body('holder_name').trim().isLength({ min: 2 }).withMessage('Cardholder name required'),
    body('expiry_month').isInt({ min: 1, max: 12 }).withMessage('Invalid expiry month'),
    body('expiry_year').isInt({ min: new Date().getFullYear() }).withMessage('Invalid expiry year'),
    body('cvv').isLength({ min: 3, max: 4 }).isNumeric().withMessage('CVV must be 3-4 digits'),
    body('is_default').optional().isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { type, number, holder_name, expiry_month, expiry_year, cvv, is_default } = req.body;

        // Check if card already exists
        const existingCard = await database.get(
            'SELECT id FROM cards WHERE user_id = ? AND number = ? AND is_active = 1',
            [req.user.id, number]
        );

        if (existingCard) {
            return res.status(400).json({
                success: false,
                error: 'Card already exists'
            });
        }

        const cardId = uuidv4();

        // If this is set as default, remove default from other cards
        if (is_default) {
            await database.run(
                'UPDATE cards SET is_default = 0 WHERE user_id = ?',
                [req.user.id]
            );
        }

        // Check if this is the first card (make it default automatically)
        const cardCount = await database.get(
            'SELECT COUNT(*) as count FROM cards WHERE user_id = ? AND is_active = 1',
            [req.user.id]
        );

        const isFirstCard = cardCount.count === 0;

        // Add new card
        await database.run(
            `INSERT INTO cards (
                id, user_id, type, number, holder_name, 
                expiry_month, expiry_year, cvv, is_default
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                cardId, req.user.id, type, number, holder_name,
                expiry_month, expiry_year, cvv, is_default || isFirstCard
            ]
        );

        // Get the added card (masked)
        const newCard = await database.get(
            `SELECT id, type, number, holder_name, expiry_month, expiry_year, 
                    is_default, is_active, created_at 
             FROM cards WHERE id = ?`,
            [cardId]
        );

        newCard.number = `${newCard.number.slice(0, 4)} **** **** ${newCard.number.slice(-4)}`;
        newCard.cvv = '***';

        res.status(201).json({
            success: true,
            message: 'Card added successfully',
            card: newCard
        });

    } catch (error) {
        console.error('Add card error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add card'
        });
    }
});

// Update card
router.put('/:cardId', verifyToken, [
    body('holder_name').optional().trim().isLength({ min: 2 }).withMessage('Cardholder name required'),
    body('expiry_month').optional().isInt({ min: 1, max: 12 }).withMessage('Invalid expiry month'),
    body('expiry_year').optional().isInt({ min: new Date().getFullYear() }).withMessage('Invalid expiry year'),
    body('is_default').optional().isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { cardId } = req.params;
        const { holder_name, expiry_month, expiry_year, is_default } = req.body;

        // Check if card exists and belongs to user
        const card = await database.get(
            'SELECT id FROM cards WHERE id = ? AND user_id = ? AND is_active = 1',
            [cardId, req.user.id]
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                error: 'Card not found'
            });
        }

        const updateFields = [];
        const updateValues = [];

        if (holder_name !== undefined) {
            updateFields.push('holder_name = ?');
            updateValues.push(holder_name);
        }
        if (expiry_month !== undefined) {
            updateFields.push('expiry_month = ?');
            updateValues.push(expiry_month);
        }
        if (expiry_year !== undefined) {
            updateFields.push('expiry_year = ?');
            updateValues.push(expiry_year);
        }
        if (is_default !== undefined) {
            updateFields.push('is_default = ?');
            updateValues.push(is_default);
            
            // If setting as default, remove default from other cards
            if (is_default) {
                await database.run(
                    'UPDATE cards SET is_default = 0 WHERE user_id = ? AND id != ?',
                    [req.user.id, cardId]
                );
            }
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        updateValues.push(cardId);

        await database.run(
            `UPDATE cards SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        // Get updated card
        const updatedCard = await database.get(
            `SELECT id, type, number, holder_name, expiry_month, expiry_year, 
                    is_default, is_active, created_at 
             FROM cards WHERE id = ?`,
            [cardId]
        );

        updatedCard.number = `${updatedCard.number.slice(0, 4)} **** **** ${updatedCard.number.slice(-4)}`;
        updatedCard.cvv = '***';

        res.json({
            success: true,
            message: 'Card updated successfully',
            card: updatedCard
        });

    } catch (error) {
        console.error('Update card error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update card'
        });
    }
});

// Delete card
router.delete('/:cardId', verifyToken, async (req, res) => {
    try {
        const { cardId } = req.params;

        // Check if card exists and belongs to user
        const card = await database.get(
            'SELECT id, is_default FROM cards WHERE id = ? AND user_id = ? AND is_active = 1',
            [cardId, req.user.id]
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                error: 'Card not found'
            });
        }

        // Soft delete the card
        await database.run(
            'UPDATE cards SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [cardId]
        );

        // If this was the default card, make another card default
        if (card.is_default) {
            const nextCard = await database.get(
                'SELECT id FROM cards WHERE user_id = ? AND is_active = 1 ORDER BY created_at ASC LIMIT 1',
                [req.user.id]
            );

            if (nextCard) {
                await database.run(
                    'UPDATE cards SET is_default = 1 WHERE id = ?',
                    [nextCard.id]
                );
            }
        }

        res.json({
            success: true,
            message: 'Card deleted successfully'
        });

    } catch (error) {
        console.error('Delete card error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete card'
        });
    }
});

// Set default card
router.put('/:cardId/default', verifyToken, async (req, res) => {
    try {
        const { cardId } = req.params;

        // Check if card exists and belongs to user
        const card = await database.get(
            'SELECT id FROM cards WHERE id = ? AND user_id = ? AND is_active = 1',
            [cardId, req.user.id]
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                error: 'Card not found'
            });
        }

        // Remove default from all user cards
        await database.run(
            'UPDATE cards SET is_default = 0 WHERE user_id = ?',
            [req.user.id]
        );

        // Set this card as default
        await database.run(
            'UPDATE cards SET is_default = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [cardId]
        );

        res.json({
            success: true,
            message: 'Default card updated successfully'
        });

    } catch (error) {
        console.error('Set default card error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to set default card'
        });
    }
});

module.exports = router;
