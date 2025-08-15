const express = require('express');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get user's financial goals
router.get('/', verifyToken, async (req, res) => {
    try {
        const goals = await database.query(
            'SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );

        res.json({
            success: true,
            goals: goals
        });
    } catch (error) {
        console.error('Get goals error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get goals'
        });
    }
});

// Create a new financial goal
router.post('/', 
    verifyToken,
    [
        body('title').notEmpty().withMessage('Goal title is required'),
        body('target_amount').isFloat({ min: 0.01 }).withMessage('Target amount must be greater than 0'),
        body('target_date').isISO8601().withMessage('Valid target date is required'),
        body('category').optional().isString()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors.array()
                });
            }

            const { title, description, target_amount, target_date, category } = req.body;

            const goalId = await database.query(
                `INSERT INTO goals (id, user_id, title, description, target_amount, current_amount, target_date, category, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    require('crypto').randomUUID(),
                    req.user.id,
                    title,
                    description || null,
                    target_amount,
                    0, // current_amount starts at 0
                    target_date,
                    category || 'general',
                    'active'
                ]
            );

            // Get the created goal
            const goal = await database.get(
                'SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
                [req.user.id]
            );

            res.status(201).json({
                success: true,
                message: 'Goal created successfully',
                goal: goal
            });
        } catch (error) {
            console.error('Create goal error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create goal'
            });
        }
    }
);

// Update goal progress
router.put('/:goalId/progress', 
    verifyToken,
    [
        body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors.array()
                });
            }

            const { goalId } = req.params;
            const { amount } = req.body;

            // Check if goal exists and belongs to user
            const goal = await database.get(
                'SELECT * FROM goals WHERE id = ? AND user_id = ?',
                [goalId, req.user.id]
            );

            if (!goal) {
                return res.status(404).json({
                    success: false,
                    error: 'Goal not found'
                });
            }

            // Update current amount
            const newCurrentAmount = parseFloat(goal.current_amount) + parseFloat(amount);
            const status = newCurrentAmount >= parseFloat(goal.target_amount) ? 'completed' : 'active';

            await database.query(
                'UPDATE goals SET current_amount = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [newCurrentAmount, status, goalId]
            );

            // Get updated goal
            const updatedGoal = await database.get(
                'SELECT * FROM goals WHERE id = ?',
                [goalId]
            );

            res.json({
                success: true,
                message: 'Goal progress updated successfully',
                goal: updatedGoal
            });
        } catch (error) {
            console.error('Update goal progress error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update goal progress'
            });
        }
    }
);

// Delete a goal
router.delete('/:goalId', verifyToken, async (req, res) => {
    try {
        const { goalId } = req.params;

        // Check if goal exists and belongs to user
        const goal = await database.get(
            'SELECT id FROM goals WHERE id = ? AND user_id = ?',
            [goalId, req.user.id]
        );

        if (!goal) {
            return res.status(404).json({
                success: false,
                error: 'Goal not found'
            });
        }

        await database.query(
            'DELETE FROM goals WHERE id = ?',
            [goalId]
        );

        res.json({
            success: true,
            message: 'Goal deleted successfully'
        });
    } catch (error) {
        console.error('Delete goal error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete goal'
        });
    }
});

module.exports = router;
