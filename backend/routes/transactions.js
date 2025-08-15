const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult, query } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// Get user transactions with filtering and pagination
router.get('/', verifyToken, [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('type').optional().isIn(['income', 'expense', 'transfer']).withMessage('Invalid transaction type'),
    query('category').optional().trim(),
    query('status').optional().isIn(['pending', 'completed', 'failed', 'cancelled']).withMessage('Invalid status'),
    query('start_date').optional().isISO8601().withMessage('Invalid start date'),
    query('end_date').optional().isISO8601().withMessage('Invalid end date')
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

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        // Build WHERE clause
        let whereConditions = ['t.user_id = ?'];
        let queryParams = [req.user.id];

        if (req.query.type) {
            whereConditions.push('t.type = ?');
            queryParams.push(req.query.type);
        }

        if (req.query.category) {
            whereConditions.push('t.category = ?');
            queryParams.push(req.query.category);
        }

        if (req.query.status) {
            whereConditions.push('t.status = ?');
            queryParams.push(req.query.status);
        }

        if (req.query.start_date) {
            whereConditions.push('t.created_at >= ?');
            queryParams.push(req.query.start_date);
        }

        if (req.query.end_date) {
            whereConditions.push('t.created_at <= ?');
            queryParams.push(req.query.end_date);
        }

        const whereClause = whereConditions.join(' AND ');

        // Get transactions
        const transactions = await database.query(
            `SELECT t.*, c.type as card_type, c.number as card_number 
             FROM transactions t 
             LEFT JOIN cards c ON t.card_id = c.id 
             WHERE ${whereClause} 
             ORDER BY t.created_at DESC 
             LIMIT ? OFFSET ?`,
            [...queryParams, limit, offset]
        );

        // Get total count (need to use table alias for consistency)
        const totalResult = await database.get(
            `SELECT COUNT(*) as total FROM transactions t WHERE ${whereClause}`,
            queryParams
        );

        // Mask card numbers
        const maskedTransactions = transactions.map(transaction => ({
            ...transaction,
            card_number: transaction.card_number ? 
                `**** ${transaction.card_number.slice(-4)}` : null
        }));

        res.json({
            success: true,
            transactions: maskedTransactions,
            pagination: {
                page,
                limit,
                total: totalResult.total,
                totalPages: Math.ceil(totalResult.total / limit)
            }
        });

    } catch (error) {
        console.error('Get transactions error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get transactions'
        });
    }
});

// Get transaction by ID
router.get('/:transactionId', verifyToken, async (req, res) => {
    try {
        const { transactionId } = req.params;

        const transaction = await database.get(
            `SELECT t.*, c.type as card_type, c.number as card_number 
             FROM transactions t 
             LEFT JOIN cards c ON t.card_id = c.id 
             WHERE t.id = ? AND t.user_id = ?`,
            [transactionId, req.user.id]
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        // Mask card number
        if (transaction.card_number) {
            transaction.card_number = `**** ${transaction.card_number.slice(-4)}`;
        }

        res.json({
            success: true,
            transaction
        });

    } catch (error) {
        console.error('Get transaction error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get transaction'
        });
    }
});

// Create new transaction
router.post('/', verifyToken, [
    body('type').isIn(['income', 'expense', 'transfer']).withMessage('Invalid transaction type'),
    body('category').trim().isLength({ min: 1 }).withMessage('Category required'),
    body('title').trim().isLength({ min: 1 }).withMessage('Title required'),
    body('description').optional().trim(),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
    body('card_id').optional().isUUID().withMessage('Invalid card ID'),
    body('reference').optional().trim()
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

        const {
            type, category, title, description, amount,
            currency, card_id, reference
        } = req.body;

        // Validate card belongs to user if provided
        if (card_id) {
            const card = await database.get(
                'SELECT id FROM cards WHERE id = ? AND user_id = ? AND is_active = 1',
                [card_id, req.user.id]
            );

            if (!card) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid card ID'
                });
            }
        }

        const transactionId = uuidv4();
        const transactionRef = reference || `TXN-${Date.now()}`;

        // Create transaction
        await database.run(
            `INSERT INTO transactions (
                id, user_id, type, category, title, description,
                amount, currency, reference, card_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                transactionId, req.user.id, type, category, title,
                description, amount, currency || 'USD', transactionRef, card_id
            ]
        );

        // Get created transaction
        const newTransaction = await database.get(
            `SELECT t.*, c.type as card_type, c.number as card_number 
             FROM transactions t 
             LEFT JOIN cards c ON t.card_id = c.id 
             WHERE t.id = ?`,
            [transactionId]
        );

        // Mask card number
        if (newTransaction.card_number) {
            newTransaction.card_number = `**** ${newTransaction.card_number.slice(-4)}`;
        }

        // Send transaction notification email (async, don't wait for it)
        const user = await database.get(
            'SELECT name FROM users WHERE id = ?',
            [req.user.id]
        );

        if (user) {
            // Get current user email from database
            const userEmail = await emailService.getUserEmail(req.user.id);
            
            if (userEmail) {
                const transactionDetails = {
                    type: type,
                    amount: amount,
                    currency: currency || 'USD',
                    title: title,
                    status: 'completed',
                    reference: transactionRef
                };

                emailService.sendTransactionAlert(userEmail, user.name, transactionDetails).catch(error => {
                    console.error('Failed to send transaction alert email:', error);
                });
            }
        }

        res.status(201).json({
            success: true,
            message: 'Transaction created successfully',
            transaction: newTransaction
        });

    } catch (error) {
        console.error('Create transaction error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create transaction'
        });
    }
});

// Update transaction
router.put('/:transactionId', verifyToken, [
    body('type').optional().isIn(['income', 'expense', 'transfer']).withMessage('Invalid transaction type'),
    body('category').optional().trim().isLength({ min: 1 }).withMessage('Category required'),
    body('title').optional().trim().isLength({ min: 1 }).withMessage('Title required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['pending', 'completed', 'failed', 'cancelled']).withMessage('Invalid status')
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

        const { transactionId } = req.params;
        const { type, category, title, description, status } = req.body;

        // Check if transaction exists and belongs to user
        const transaction = await database.get(
            'SELECT id FROM transactions WHERE id = ? AND user_id = ?',
            [transactionId, req.user.id]
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        const updateFields = [];
        const updateValues = [];

        if (type !== undefined) {
            updateFields.push('type = ?');
            updateValues.push(type);
        }
        if (category !== undefined) {
            updateFields.push('category = ?');
            updateValues.push(category);
        }
        if (title !== undefined) {
            updateFields.push('title = ?');
            updateValues.push(title);
        }
        if (description !== undefined) {
            updateFields.push('description = ?');
            updateValues.push(description);
        }
        if (status !== undefined) {
            updateFields.push('status = ?');
            updateValues.push(status);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        updateValues.push(transactionId);

        await database.run(
            `UPDATE transactions SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        // Get updated transaction
        const updatedTransaction = await database.get(
            `SELECT t.*, c.type as card_type, c.number as card_number 
             FROM transactions t 
             LEFT JOIN cards c ON t.card_id = c.id 
             WHERE t.id = ?`,
            [transactionId]
        );

        // Mask card number
        if (updatedTransaction.card_number) {
            updatedTransaction.card_number = `**** ${updatedTransaction.card_number.slice(-4)}`;
        }

        res.json({
            success: true,
            message: 'Transaction updated successfully',
            transaction: updatedTransaction
        });

    } catch (error) {
        console.error('Update transaction error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update transaction'
        });
    }
});

// Delete transaction
router.delete('/:transactionId', verifyToken, async (req, res) => {
    try {
        const { transactionId } = req.params;

        // Check if transaction exists and belongs to user
        const transaction = await database.get(
            'SELECT id FROM transactions WHERE id = ? AND user_id = ?',
            [transactionId, req.user.id]
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        // Delete transaction
        await database.run(
            'DELETE FROM transactions WHERE id = ?',
            [transactionId]
        );

        res.json({
            success: true,
            message: 'Transaction deleted successfully'
        });

    } catch (error) {
        console.error('Delete transaction error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete transaction'
        });
    }
});

// Get transaction statistics
router.get('/stats/summary', verifyToken, [
    query('start_date').optional().isISO8601().withMessage('Invalid start date'),
    query('end_date').optional().isISO8601().withMessage('Invalid end date')
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

        let whereConditions = ['user_id = ?'];
        let queryParams = [req.user.id];

        if (req.query.start_date) {
            whereConditions.push('created_at >= ?');
            queryParams.push(req.query.start_date);
        }

        if (req.query.end_date) {
            whereConditions.push('created_at <= ?');
            queryParams.push(req.query.end_date);
        }

        const whereClause = whereConditions.join(' AND ');

        // Get statistics
        const stats = await database.query(
            `SELECT 
                type,
                status,
                COUNT(*) as count,
                SUM(amount) as total_amount,
                AVG(amount) as avg_amount
             FROM transactions 
             WHERE ${whereClause}
             GROUP BY type, status`,
            queryParams
        );

        // Get monthly trends
        const monthlyTrends = await database.query(
            `SELECT 
                strftime('%Y-%m', created_at) as month,
                type,
                COUNT(*) as count,
                SUM(amount) as total_amount
             FROM transactions 
             WHERE ${whereClause}
             GROUP BY month, type
             ORDER BY month DESC`,
            queryParams
        );

        res.json({
            success: true,
            stats,
            monthlyTrends
        });

    } catch (error) {
        console.error('Get transaction stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get transaction statistics'
        });
    }
});

module.exports = router;
