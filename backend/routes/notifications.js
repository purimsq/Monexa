const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult, query } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get user notifications with filtering and pagination
router.get('/', verifyToken, [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('type').optional().isIn(['info', 'success', 'warning', 'error']).withMessage('Invalid notification type'),
    query('category').optional().trim(),
    query('is_read').optional().isBoolean().withMessage('is_read must be boolean'),
    query('search').optional().trim()
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
        let whereConditions = ['user_id = ?'];
        let queryParams = [req.user.id];

        if (req.query.type) {
            whereConditions.push('type = ?');
            queryParams.push(req.query.type);
        }

        if (req.query.category) {
            whereConditions.push('category = ?');
            queryParams.push(req.query.category);
        }

        if (req.query.is_read !== undefined) {
            whereConditions.push('is_read = ?');
            queryParams.push(req.query.is_read === 'true' ? 1 : 0);
        }

        if (req.query.search) {
            const searchQuery = `%${req.query.search}%`;
            whereConditions.push('(title LIKE ? OR message LIKE ?)');
            queryParams.push(searchQuery, searchQuery);
        }

        const whereClause = whereConditions.join(' AND ');

        // Get notifications
        const notifications = await database.query(
            `SELECT id, title, message, type, category, is_read, 
                    action_url, created_at 
             FROM notifications 
             WHERE ${whereClause} 
             ORDER BY created_at DESC 
             LIMIT ? OFFSET ?`,
            [...queryParams, limit, offset]
        );

        // Get total count
        const totalResult = await database.get(
            `SELECT COUNT(*) as total FROM notifications WHERE ${whereClause}`,
            queryParams
        );

        // Get unread count
        const unreadResult = await database.get(
            'SELECT COUNT(*) as unread FROM notifications WHERE user_id = ? AND is_read = 0',
            [req.user.id]
        );

        res.json({
            success: true,
            notifications,
            pagination: {
                page,
                limit,
                total: totalResult.total,
                totalPages: Math.ceil(totalResult.total / limit)
            },
            unreadCount: unreadResult.unread
        });

    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get notifications'
        });
    }
});

// Get notification by ID
router.get('/:notificationId', verifyToken, async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await database.get(
            `SELECT * FROM notifications 
             WHERE id = ? AND user_id = ?`,
            [notificationId, req.user.id]
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                error: 'Notification not found'
            });
        }

        res.json({
            success: true,
            notification
        });

    } catch (error) {
        console.error('Get notification error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get notification'
        });
    }
});

// Create new notification (internal use - for system notifications)
router.post('/', verifyToken, [
    body('title').trim().isLength({ min: 1 }).withMessage('Title required'),
    body('message').trim().isLength({ min: 1 }).withMessage('Message required'),
    body('type').isIn(['info', 'success', 'warning', 'error']).withMessage('Invalid notification type'),
    body('category').optional().trim(),
    body('action_url').optional().trim()
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

        const { title, message, type, category, action_url } = req.body;
        const notificationId = uuidv4();

        // Create notification
        await database.run(
            `INSERT INTO notifications (
                id, user_id, title, message, type, category, action_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [notificationId, req.user.id, title, message, type, category, action_url]
        );

        // Get created notification
        const newNotification = await database.get(
            'SELECT * FROM notifications WHERE id = ?',
            [notificationId]
        );

        res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            notification: newNotification
        });

    } catch (error) {
        console.error('Create notification error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create notification'
        });
    }
});

// Mark notification as read
router.put('/:notificationId/read', verifyToken, async (req, res) => {
    try {
        const { notificationId } = req.params;

        // Check if notification exists and belongs to user
        const notification = await database.get(
            'SELECT id FROM notifications WHERE id = ? AND user_id = ?',
            [notificationId, req.user.id]
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                error: 'Notification not found'
            });
        }

        // Mark as read
        await database.run(
            'UPDATE notifications SET is_read = 1 WHERE id = ?',
            [notificationId]
        );

        res.json({
            success: true,
            message: 'Notification marked as read'
        });

    } catch (error) {
        console.error('Mark notification read error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to mark notification as read'
        });
    }
});

// Mark notification as unread
router.put('/:notificationId/unread', verifyToken, async (req, res) => {
    try {
        const { notificationId } = req.params;

        // Check if notification exists and belongs to user
        const notification = await database.get(
            'SELECT id FROM notifications WHERE id = ? AND user_id = ?',
            [notificationId, req.user.id]
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                error: 'Notification not found'
            });
        }

        // Mark as unread
        await database.run(
            'UPDATE notifications SET is_read = 0 WHERE id = ?',
            [notificationId]
        );

        res.json({
            success: true,
            message: 'Notification marked as unread'
        });

    } catch (error) {
        console.error('Mark notification unread error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to mark notification as unread'
        });
    }
});

// Mark all notifications as read
router.put('/read-all', verifyToken, async (req, res) => {
    try {
        await database.run(
            'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0',
            [req.user.id]
        );

        res.json({
            success: true,
            message: 'All notifications marked as read'
        });

    } catch (error) {
        console.error('Mark all notifications read error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to mark all notifications as read'
        });
    }
});

// Delete notification
router.delete('/:notificationId', verifyToken, async (req, res) => {
    try {
        const { notificationId } = req.params;

        // Check if notification exists and belongs to user
        const notification = await database.get(
            'SELECT id FROM notifications WHERE id = ? AND user_id = ?',
            [notificationId, req.user.id]
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                error: 'Notification not found'
            });
        }

        // Delete notification
        await database.run(
            'DELETE FROM notifications WHERE id = ?',
            [notificationId]
        );

        res.json({
            success: true,
            message: 'Notification deleted successfully'
        });

    } catch (error) {
        console.error('Delete notification error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete notification'
        });
    }
});

// Delete all read notifications
router.delete('/read-all', verifyToken, async (req, res) => {
    try {
        const result = await database.run(
            'DELETE FROM notifications WHERE user_id = ? AND is_read = 1',
            [req.user.id]
        );

        res.json({
            success: true,
            message: `${result.changes} read notifications deleted successfully`
        });

    } catch (error) {
        console.error('Delete read notifications error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete read notifications'
        });
    }
});

// Get notification statistics
router.get('/stats/summary', verifyToken, async (req, res) => {
    try {
        // Get statistics by type
        const typeStats = await database.query(
            `SELECT type, COUNT(*) as count, 
                    SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread_count
             FROM notifications 
             WHERE user_id = ? 
             GROUP BY type`,
            [req.user.id]
        );

        // Get statistics by category
        const categoryStats = await database.query(
            `SELECT category, COUNT(*) as count, 
                    SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread_count
             FROM notifications 
             WHERE user_id = ? AND category IS NOT NULL 
             GROUP BY category`,
            [req.user.id]
        );

        // Get daily activity (last 30 days)
        const dailyActivity = await database.query(
            `SELECT 
                date(created_at) as date,
                COUNT(*) as count
             FROM notifications 
             WHERE user_id = ? AND created_at >= date('now', '-30 days')
             GROUP BY date(created_at)
             ORDER BY date DESC`,
            [req.user.id]
        );

        res.json({
            success: true,
            typeStats,
            categoryStats,
            dailyActivity
        });

    } catch (error) {
        console.error('Get notification stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get notification statistics'
        });
    }
});

// Helper function to create system notifications
const createSystemNotification = async (userId, title, message, type = 'info', category = 'system', actionUrl = null) => {
    try {
        const notificationId = uuidv4();
        
        await database.run(
            `INSERT INTO notifications (
                id, user_id, title, message, type, category, action_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [notificationId, userId, title, message, type, category, actionUrl]
        );

        return notificationId;
    } catch (error) {
        console.error('Create system notification error:', error);
        return null;
    }
};

// Export helper function for use in other modules
module.exports = router;
module.exports.createSystemNotification = createSystemNotification;
