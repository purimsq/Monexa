const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get user beneficiaries
router.get('/', verifyToken, async (req, res) => {
    try {
        const beneficiaries = await database.query(
            `SELECT id, name, email, phone, account_number, bank_name, 
                    relationship, artist_name, paypal_email, links,
                    is_active, created_at, updated_at 
             FROM beneficiaries 
             WHERE user_id = ? AND is_active = 1 
             ORDER BY name ASC`,
            [req.user.id]
        );

        // Parse links JSON for each beneficiary
        const processedBeneficiaries = beneficiaries.map(beneficiary => ({
            ...beneficiary,
            links: beneficiary.links ? JSON.parse(beneficiary.links) : []
        }));

        res.json({
            success: true,
            beneficiaries: processedBeneficiaries
        });

    } catch (error) {
        console.error('Get beneficiaries error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get beneficiaries'
        });
    }
});

// Get beneficiary by ID
router.get('/:beneficiaryId', verifyToken, async (req, res) => {
    try {
        const { beneficiaryId } = req.params;

        const beneficiary = await database.get(
            `SELECT id, name, email, phone, account_number, bank_name, 
                    relationship, is_active, created_at, updated_at 
             FROM beneficiaries 
             WHERE id = ? AND user_id = ? AND is_active = 1`,
            [beneficiaryId, req.user.id]
        );

        if (!beneficiary) {
            return res.status(404).json({
                success: false,
                error: 'Beneficiary not found'
            });
        }

        res.json({
            success: true,
            beneficiary
        });

    } catch (error) {
        console.error('Get beneficiary error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get beneficiary'
        });
    }
});

// Add new beneficiary
router.post('/', verifyToken, [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').trim().custom((value) => {
        if (!value || value === '') {
            throw new Error('Email is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Valid email required');
        }
        return true;
    }),
    body('phone').optional().trim(),
    body('account_number').optional().trim(),
    body('bank_name').optional().trim(),
    body('relationship').optional().trim(),
    body('artist_name').optional().trim(),
    body('paypal_email').optional().trim().custom((value) => {
        if (value && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                throw new Error('Valid PayPal email required');
            }
        }
        return true;
    }),
    body('links').optional().custom((value) => {
        if (value && !Array.isArray(value)) {
            throw new Error('Links must be an array');
        }
        return true;
    })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('Validation errors:', errors.array());
            console.error('Request body:', req.body);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { name, email, phone, account_number, bank_name, relationship, artist_name, paypal_email, links } = req.body;

        // Check if beneficiary with same name already exists
        const existingBeneficiary = await database.get(
            'SELECT id FROM beneficiaries WHERE user_id = ? AND name = ? AND is_active = 1',
            [req.user.id, name]
        );

        if (existingBeneficiary) {
            return res.status(400).json({
                success: false,
                error: 'Beneficiary with this name already exists'
            });
        }

        const beneficiaryId = uuidv4();

        // Add new beneficiary
        await database.run(
            `INSERT INTO beneficiaries (
                id, user_id, name, email, phone, account_number, 
                bank_name, relationship, artist_name, paypal_email, links
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                beneficiaryId, req.user.id, name, email, phone,
                account_number, bank_name, relationship, 
                artist_name || null, paypal_email || null, 
                links ? JSON.stringify(links) : null
            ]
        );

        // Get the added beneficiary
        const newBeneficiary = await database.get(
            `SELECT id, name, email, phone, account_number, bank_name, 
                    relationship, artist_name, paypal_email, links,
                    is_active, created_at, updated_at 
             FROM beneficiaries WHERE id = ?`,
            [beneficiaryId]
        );

        // Parse links JSON
        const processedBeneficiary = {
            ...newBeneficiary,
            links: newBeneficiary.links ? JSON.parse(newBeneficiary.links) : []
        };

        res.status(201).json({
            success: true,
            message: 'Beneficiary added successfully',
            beneficiary: processedBeneficiary
        });

    } catch (error) {
        console.error('Add beneficiary error:', error);
        console.error('Request body:', req.body);
        res.status(500).json({
            success: false,
            error: 'Failed to add beneficiary',
            details: error.message
        });
    }
});

// Update beneficiary
router.put('/:beneficiaryId', verifyToken, [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').optional().trim().custom((value) => {
        if (value && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                throw new Error('Valid email required');
            }
        }
        return true;
    }),
    body('phone').optional().trim(),
    body('account_number').optional().trim(),
    body('bank_name').optional().trim(),
    body('relationship').optional().trim(),
    body('artist_name').optional().trim(),
    body('paypal_email').optional().trim().custom((value) => {
        if (value && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                throw new Error('Valid PayPal email required');
            }
        }
        return true;
    }),
    body('links').optional().custom((value) => {
        if (value && !Array.isArray(value)) {
            throw new Error('Links must be an array');
        }
        return true;
    })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('PUT Validation errors:', errors.array());
            console.error('PUT Request body:', req.body);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { beneficiaryId } = req.params;
        const { name, email, phone, account_number, bank_name, relationship, artist_name, paypal_email, links } = req.body;

        // Check if beneficiary exists and belongs to user
        const beneficiary = await database.get(
            'SELECT id FROM beneficiaries WHERE id = ? AND user_id = ? AND is_active = 1',
            [beneficiaryId, req.user.id]
        );

        if (!beneficiary) {
            return res.status(404).json({
                success: false,
                error: 'Beneficiary not found'
            });
        }

        // Check if another beneficiary with same name exists (if name is being changed)
        if (name) {
            const existingBeneficiary = await database.get(
                'SELECT id FROM beneficiaries WHERE user_id = ? AND name = ? AND id != ? AND is_active = 1',
                [req.user.id, name, beneficiaryId]
            );

            if (existingBeneficiary) {
                return res.status(400).json({
                    success: false,
                    error: 'Beneficiary with this name already exists'
                });
            }
        }

        const updateFields = [];
        const updateValues = [];

        if (name !== undefined) {
            updateFields.push('name = ?');
            updateValues.push(name);
        }
        if (email !== undefined) {
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (phone !== undefined) {
            updateFields.push('phone = ?');
            updateValues.push(phone);
        }
        if (account_number !== undefined) {
            updateFields.push('account_number = ?');
            updateValues.push(account_number);
        }
        if (bank_name !== undefined) {
            updateFields.push('bank_name = ?');
            updateValues.push(bank_name);
        }
        if (relationship !== undefined) {
            updateFields.push('relationship = ?');
            updateValues.push(relationship);
        }
        if (artist_name !== undefined) {
            updateFields.push('artist_name = ?');
            updateValues.push(artist_name);
        }
        if (paypal_email !== undefined) {
            updateFields.push('paypal_email = ?');
            updateValues.push(paypal_email);
        }
        if (links !== undefined) {
            updateFields.push('links = ?');
            updateValues.push(links ? JSON.stringify(links) : null);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        updateValues.push(beneficiaryId);

        await database.run(
            `UPDATE beneficiaries SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        // Get updated beneficiary
        const updatedBeneficiary = await database.get(
            `SELECT id, name, email, phone, account_number, bank_name, 
                    relationship, artist_name, paypal_email, links,
                    is_active, created_at, updated_at 
             FROM beneficiaries WHERE id = ?`,
            [beneficiaryId]
        );

        // Parse links JSON
        const processedBeneficiary = {
            ...updatedBeneficiary,
            links: updatedBeneficiary.links ? JSON.parse(updatedBeneficiary.links) : []
        };

        res.json({
            success: true,
            message: 'Beneficiary updated successfully',
            beneficiary: processedBeneficiary
        });

    } catch (error) {
        console.error('Update beneficiary error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update beneficiary'
        });
    }
});

// Delete beneficiary
router.delete('/:beneficiaryId', verifyToken, async (req, res) => {
    try {
        const { beneficiaryId } = req.params;

        // Check if beneficiary exists and belongs to user
        const beneficiary = await database.get(
            'SELECT id FROM beneficiaries WHERE id = ? AND user_id = ? AND is_active = 1',
            [beneficiaryId, req.user.id]
        );

        if (!beneficiary) {
            return res.status(404).json({
                success: false,
                error: 'Beneficiary not found'
            });
        }

        // Soft delete the beneficiary
        await database.run(
            'UPDATE beneficiaries SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [beneficiaryId]
        );

        res.json({
            success: true,
            message: 'Beneficiary deleted successfully'
        });

    } catch (error) {
        console.error('Delete beneficiary error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete beneficiary'
        });
    }
});

// Search beneficiaries
router.get('/search/:query', verifyToken, async (req, res) => {
    try {
        const { query } = req.params;
        const searchQuery = `%${query}%`;

        const beneficiaries = await database.query(
            `SELECT id, name, email, phone, account_number, bank_name, 
                    relationship, is_active, created_at, updated_at 
             FROM beneficiaries 
             WHERE user_id = ? AND is_active = 1 
             AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR bank_name LIKE ?)
             ORDER BY name ASC`,
            [req.user.id, searchQuery, searchQuery, searchQuery, searchQuery]
        );

        res.json({
            success: true,
            beneficiaries,
            query
        });

    } catch (error) {
        console.error('Search beneficiaries error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search beneficiaries'
        });
    }
});

module.exports = router;
