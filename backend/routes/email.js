const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { verifyToken } = require('../middleware/auth');
const database = require('../config/database');
const emailService = require('../services/emailService');
require('dotenv').config();

// Send email endpoint
router.post('/send', verifyToken, [
    body('recipient').isEmail().withMessage('Valid recipient email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('body').notEmpty().withMessage('Email body is required'),
    body('template').isIn(['payment', 'beat', 'custom']).withMessage('Valid template type is required')
], async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Validation failed', 
                details: errors.array() 
            });
        }

        const { recipient, subject, body, template, attachment } = req.body;
        const userId = req.user.id;

        // Get user's profile email for Reply-To header
        const userQuery = 'SELECT email FROM users WHERE id = ?';
        const userResult = await database.get(userQuery, [userId]);
        
        if (!userResult) {
            return res.status(404).json({ 
                success: false, 
                error: 'User not found' 
            });
        }

        const userEmail = userResult.email;

        // Send email using Python service
        let emailSent = false;
        
        if (attachment && template === 'beat') {
            // Send email with beat attachment
            const attachmentData = {
                filename: attachment.name,
                content: attachment.data,
                content_type: attachment.type
            };
            
            emailSent = await emailService.sendBeatEmail(
                recipient,
                req.user.name || 'User',
                subject,
                body,
                attachmentData
            );
        } else {
            // Send regular notification email
            emailSent = await emailService.sendNotificationEmail(
                recipient,
                req.user.name || 'User',
                subject,
                body
            );
        }

        if (!emailSent) {
            throw new Error('Failed to send email via Python service');
        }

        // Save email to database
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const insertQuery = `
            INSERT INTO emails (user_id, recipient, subject, body, template, status, sent_at, message_id)
            VALUES (?, ?, ?, ?, ?, 'sent', datetime('now'), ?)
        `;
        
        await database.run(insertQuery, [
            userId,
            recipient,
            subject,
            body,
            template,
            messageId
        ]);

        console.log('Email sent successfully:', messageId);

        res.json({
            success: true,
            message: 'Email sent successfully',
            messageId: messageId
        });

    } catch (error) {
        console.error('Email sending error:', error);
        
        // Save failed email to database
        try {
            const insertQuery = `
                INSERT INTO emails (user_id, recipient, subject, body, template, status, sent_at, error_message)
                VALUES (?, ?, ?, ?, ?, 'failed', datetime('now'), ?)
            `;
            
            await database.run(insertQuery, [
                req.user.id,
                req.body.recipient,
                req.body.subject,
                req.body.body,
                req.body.template,
                error.message
            ]);
        } catch (dbError) {
            console.error('Failed to save email error to database:', dbError);
        }

        res.status(500).json({
            success: false,
            error: 'Failed to send email',
            details: error.message
        });
    }
});

// Get email history
router.get('/history', verifyToken, async (req, res) => {
    try {
        const { limit = 50, offset = 0 } = req.query;
        const userId = req.user.id;

        const query = `
            SELECT id, recipient, subject, template, status, sent_at, error_message
            FROM emails 
            WHERE user_id = ? 
            ORDER BY sent_at DESC 
            LIMIT ? OFFSET ?
        `;

        const emails = await database.all(query, [userId, limit, offset]);

        res.json({
            success: true,
            emails: emails
        });

    } catch (error) {
        console.error('Error fetching email history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email history'
        });
    }
});

// Delete email
router.delete('/:emailId', verifyToken, async (req, res) => {
    try {
        const { emailId } = req.params;
        const userId = req.user.id;

        const query = 'DELETE FROM emails WHERE id = ? AND user_id = ?';
        const result = await database.run(query, [emailId, userId]);

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: 'Email not found or not authorized to delete'
            });
        }

        res.json({
            success: true,
            message: 'Email deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting email:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete email'
        });
    }
});

module.exports = router;
