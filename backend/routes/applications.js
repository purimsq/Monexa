const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult, query } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get user applications with filtering and pagination
router.get('/', verifyToken, [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('type').optional().trim(),
    query('status').optional().isIn(['pending', 'approved', 'rejected', 'under_review']).withMessage('Invalid status'),
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

        if (req.query.status) {
            whereConditions.push('status = ?');
            queryParams.push(req.query.status);
        }

        if (req.query.search) {
            const searchQuery = `%${req.query.search}%`;
            whereConditions.push('(title LIKE ? OR description LIKE ?)');
            queryParams.push(searchQuery, searchQuery);
        }

        const whereClause = whereConditions.join(' AND ');

        // Get applications
        const applications = await database.query(
            `SELECT id, type, title, description, status, amount, currency, 
                    notes, created_at, updated_at 
             FROM applications 
             WHERE ${whereClause} 
             ORDER BY created_at DESC 
             LIMIT ? OFFSET ?`,
            [...queryParams, limit, offset]
        );

        // Get total count
        const totalResult = await database.get(
            `SELECT COUNT(*) as total FROM applications WHERE ${whereClause}`,
            queryParams
        );

        res.json({
            success: true,
            applications,
            pagination: {
                page,
                limit,
                total: totalResult.total,
                totalPages: Math.ceil(totalResult.total / limit)
            }
        });

    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get applications'
        });
    }
});

// Get application by ID
router.get('/:applicationId', verifyToken, async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await database.get(
            `SELECT * FROM applications 
             WHERE id = ? AND user_id = ?`,
            [applicationId, req.user.id]
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                error: 'Application not found'
            });
        }

        // Parse documents JSON if exists
        if (application.documents) {
            try {
                application.documents = JSON.parse(application.documents);
            } catch {
                application.documents = [];
            }
        }

        res.json({
            success: true,
            application
        });

    } catch (error) {
        console.error('Get application error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get application'
        });
    }
});

// Create new application
router.post('/', verifyToken, [
    body('type').trim().isLength({ min: 1 }).withMessage('Application type required'),
    body('title').trim().isLength({ min: 1 }).withMessage('Title required'),
    body('description').optional().trim(),
    body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be non-negative'),
    body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
    body('documents').optional().isArray().withMessage('Documents must be an array')
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
            type, title, description, amount, currency, documents
        } = req.body;

        const applicationId = uuidv4();

        // Validate document IDs if provided
        let documentsJson = null;
        if (documents && documents.length > 0) {
            // Verify all documents belong to the user
            const userDocuments = await database.query(
                `SELECT id FROM documents 
                 WHERE user_id = ? AND id IN (${documents.map(() => '?').join(',')})`,
                [req.user.id, ...documents]
            );

            if (userDocuments.length !== documents.length) {
                return res.status(400).json({
                    success: false,
                    error: 'Some documents not found or do not belong to user'
                });
            }

            documentsJson = JSON.stringify(documents);
        }

        // Create application
        await database.run(
            `INSERT INTO applications (
                id, user_id, type, title, description, amount, 
                currency, documents
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                applicationId, req.user.id, type, title, description,
                amount, currency || 'USD', documentsJson
            ]
        );

        // Get created application
        const newApplication = await database.get(
            'SELECT * FROM applications WHERE id = ?',
            [applicationId]
        );

        // Parse documents JSON
        if (newApplication.documents) {
            try {
                newApplication.documents = JSON.parse(newApplication.documents);
            } catch {
                newApplication.documents = [];
            }
        }

        res.status(201).json({
            success: true,
            message: 'Application created successfully',
            application: newApplication
        });

    } catch (error) {
        console.error('Create application error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create application'
        });
    }
});

// Update application
router.put('/:applicationId', verifyToken, [
    body('type').optional().trim().isLength({ min: 1 }).withMessage('Application type required'),
    body('title').optional().trim().isLength({ min: 1 }).withMessage('Title required'),
    body('description').optional().trim(),
    body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be non-negative'),
    body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
    body('documents').optional().isArray().withMessage('Documents must be an array'),
    body('notes').optional().trim()
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

        const { applicationId } = req.params;
        const {
            type, title, description, amount, currency, documents, notes
        } = req.body;

        // Check if application exists and belongs to user
        const application = await database.get(
            'SELECT id, status FROM applications WHERE id = ? AND user_id = ?',
            [applicationId, req.user.id]
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                error: 'Application not found'
            });
        }

        // Check if application can be updated (only pending and under_review can be updated)
        if (!['pending', 'under_review'].includes(application.status)) {
            return res.status(400).json({
                success: false,
                error: 'Application cannot be updated in current status'
            });
        }

        const updateFields = [];
        const updateValues = [];

        if (type !== undefined) {
            updateFields.push('type = ?');
            updateValues.push(type);
        }
        if (title !== undefined) {
            updateFields.push('title = ?');
            updateValues.push(title);
        }
        if (description !== undefined) {
            updateFields.push('description = ?');
            updateValues.push(description);
        }
        if (amount !== undefined) {
            updateFields.push('amount = ?');
            updateValues.push(amount);
        }
        if (currency !== undefined) {
            updateFields.push('currency = ?');
            updateValues.push(currency);
        }
        if (notes !== undefined) {
            updateFields.push('notes = ?');
            updateValues.push(notes);
        }

        // Handle documents update
        if (documents !== undefined) {
            let documentsJson = null;
            if (documents.length > 0) {
                // Verify all documents belong to the user
                const userDocuments = await database.query(
                    `SELECT id FROM documents 
                     WHERE user_id = ? AND id IN (${documents.map(() => '?').join(',')})`,
                    [req.user.id, ...documents]
                );

                if (userDocuments.length !== documents.length) {
                    return res.status(400).json({
                        success: false,
                        error: 'Some documents not found or do not belong to user'
                    });
                }

                documentsJson = JSON.stringify(documents);
            }

            updateFields.push('documents = ?');
            updateValues.push(documentsJson);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        updateValues.push(applicationId);

        await database.run(
            `UPDATE applications SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        // Get updated application
        const updatedApplication = await database.get(
            'SELECT * FROM applications WHERE id = ?',
            [applicationId]
        );

        // Parse documents JSON
        if (updatedApplication.documents) {
            try {
                updatedApplication.documents = JSON.parse(updatedApplication.documents);
            } catch {
                updatedApplication.documents = [];
            }
        }

        res.json({
            success: true,
            message: 'Application updated successfully',
            application: updatedApplication
        });

    } catch (error) {
        console.error('Update application error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update application'
        });
    }
});

// Delete application
router.delete('/:applicationId', verifyToken, async (req, res) => {
    try {
        const { applicationId } = req.params;

        // Check if application exists and belongs to user
        const application = await database.get(
            'SELECT id, status FROM applications WHERE id = ? AND user_id = ?',
            [applicationId, req.user.id]
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                error: 'Application not found'
            });
        }

        // Check if application can be deleted (only pending can be deleted)
        if (application.status !== 'pending') {
            return res.status(400).json({
                success: false,
                error: 'Only pending applications can be deleted'
            });
        }

        // Delete application
        await database.run(
            'DELETE FROM applications WHERE id = ?',
            [applicationId]
        );

        res.json({
            success: true,
            message: 'Application deleted successfully'
        });

    } catch (error) {
        console.error('Delete application error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete application'
        });
    }
});

// Get application statistics
router.get('/stats/summary', verifyToken, async (req, res) => {
    try {
        // Get statistics by status
        const statusStats = await database.query(
            `SELECT status, COUNT(*) as count, 
                    AVG(amount) as avg_amount, SUM(amount) as total_amount
             FROM applications 
             WHERE user_id = ? 
             GROUP BY status`,
            [req.user.id]
        );

        // Get statistics by type
        const typeStats = await database.query(
            `SELECT type, COUNT(*) as count, 
                    AVG(amount) as avg_amount, SUM(amount) as total_amount
             FROM applications 
             WHERE user_id = ? 
             GROUP BY type`,
            [req.user.id]
        );

        // Get monthly trends
        const monthlyTrends = await database.query(
            `SELECT 
                strftime('%Y-%m', created_at) as month,
                status,
                COUNT(*) as count,
                SUM(amount) as total_amount
             FROM applications 
             WHERE user_id = ? 
             GROUP BY month, status
             ORDER BY month DESC`,
            [req.user.id]
        );

        res.json({
            success: true,
            statusStats,
            typeStats,
            monthlyTrends
        });

    } catch (error) {
        console.error('Get application stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get application statistics'
        });
    }
});

// Get application types
router.get('/types/list', verifyToken, async (req, res) => {
    try {
        const types = await database.query(
            `SELECT DISTINCT type, COUNT(*) as count 
             FROM applications 
             WHERE user_id = ? 
             GROUP BY type 
             ORDER BY count DESC, type ASC`,
            [req.user.id]
        );

        // Add some default types if none exist
        const defaultTypes = [
            'loan', 'partnership', 'collaboration', 'grant', 
            'sponsorship', 'licensing', 'distribution'
        ];

        const existingTypes = types.map(t => t.type);
        const suggestedTypes = defaultTypes.filter(type => !existingTypes.includes(type));

        res.json({
            success: true,
            userTypes: types,
            suggestedTypes
        });

    } catch (error) {
        console.error('Get application types error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get application types'
        });
    }
});

module.exports = router;
