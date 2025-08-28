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

        const { recipient, subject, body, template, attachment, attachments, clientId } = req.body;
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

        // Send email using the email service
        let emailSent = false;
        console.log('Starting email sending process...');
        console.log('Template:', template);
        console.log('Has attachments:', !!(attachments || attachment));
        console.log('Recipient:', recipient);
        console.log('User email for Reply-To:', userEmail);
        
        try {
            if (template === 'beat' && (attachments || attachment)) {
                // Handle beat emails with attachments
                const attachmentData = attachments || (attachment ? [attachment] : []);
                
                if (attachmentData.length > 0) {
                    // Check total size of attachments
                    const totalSize = attachmentData.reduce((total, att) => {
                        return total + (att.data ? att.data.length * 0.75 : 0);
                    }, 0);
                    
                    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
                    
                    if (totalSize > maxSize) {
                        // Files are too large, send notification instead
                        emailSent = await emailService.sendLargeFileNotification(
                            recipient,
                            req.user.name || 'User',
                            subject,
                            body,
                            attachmentData,
                            userEmail
                        );
                    } else {
                        // Files are within size limit, send as regular attachments
                        const attachmentDataArray = attachmentData.map(att => ({
                            filename: att.name,
                            content: att.data,
                            content_type: att.type
                        }));

                        console.log('Calling sendBeatEmail with attachments...');
                        emailSent = await emailService.sendBeatEmail(
                            recipient,
                            req.user.name || 'User',
                            subject,
                            body,
                            attachmentDataArray,
                            userEmail
                        );
                        console.log('sendBeatEmail result:', emailSent);
                    }
                } else {
                    // No attachments, send as notification
                    emailSent = await emailService.sendNotificationEmail(
                        recipient,
                        req.user.name || 'User',
                        subject,
                        body,
                        userEmail
                    );
                }
            } else {
                // Send regular notification email
                console.log('Calling sendNotificationEmail...');
                emailSent = await emailService.sendNotificationEmail(
                    recipient,
                    req.user.name || 'User',
                    subject,
                    body,
                    userEmail
                );
                console.log('sendNotificationEmail result:', emailSent);
            }
        } catch (emailError) {
            console.error('Email service error:', emailError);
            console.error('Email error stack:', emailError.stack);
            console.error('Email error details:', {
                message: emailError.message,
                code: emailError.code,
                errno: emailError.errno
            });
            // Continue with database insertion even if email fails
            emailSent = false;
        }

        // Log the email sending result
        console.log('Email sending result:', emailSent);
        
        // For now, let's allow the process to continue even if email fails
        // This will help us debug the database insertion
        if (!emailSent) {
            console.warn('Email service failed, but continuing with database insertion for debugging');
        }

        // Prepare attachments data for storage
        let attachmentsData = null;
        if (attachments && attachments.length > 0) {
            attachmentsData = JSON.stringify(attachments.map(att => ({
                name: att.name,
                type: att.type,
                size: att.data ? att.data.length * 0.75 : 0 // Approximate size
            })));
        } else if (attachment) {
            attachmentsData = JSON.stringify([{
                name: attachment.name,
                type: attachment.type,
                size: attachment.data ? attachment.data.length * 0.75 : 0
            }]);
        }

        // Generate messageId outside try block so it's available in catch block
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        try {
            // Prepare client_id and attachments data for storage
            const clientId = req.body.clientId || null;
            let attachmentsData = null;
            
            if (attachments && attachments.length > 0) {
                attachmentsData = JSON.stringify(attachments.map(att => ({
                    name: att.name,
                    type: att.type,
                    size: att.data ? att.data.length * 0.75 : 0
                })));
            } else if (attachment) {
                attachmentsData = JSON.stringify([{
                    name: attachment.name,
                    type: attachment.type,
                    size: attachment.data ? attachment.data.length * 0.75 : 0
                }]);
            }
            
            // Save email to database with client tracking
            const insertQuery = `
                INSERT INTO emails (user_id, recipient, subject, body, template, status, sent_at, message_id, client_id, attachments)
                VALUES (?, ?, ?, ?, ?, 'sent', datetime('now'), ?, ?, ?)
            `;
            
            console.log('Inserting email with client tracking');
            console.log('Client ID:', clientId);
            console.log('Attachments data:', attachmentsData);
            
            await database.run(insertQuery, [
                userId,
                recipient,
                subject,
                body,
                template,
                messageId,
                clientId,
                attachmentsData
            ]);

            console.log('Email data saved successfully with client tracking:', messageId);

            res.json({
                success: true,
                message: emailSent ? 'Email sent successfully!' : 'Email saved but sending failed',
                messageId: messageId
            });
        } catch (dbError) {
            console.error('Database insertion error:', dbError);
            throw new Error(`Failed to save email to database: ${dbError.message}`);
        }

    } catch (error) {
        console.error('Email sending error:', error);
        
        // Save failed email to database with client tracking
        try {
            const clientId = req.body.clientId || null;
            let attachmentsData = null;
            
            if (attachments && attachments.length > 0) {
                attachmentsData = JSON.stringify(attachments.map(att => ({
                    name: att.name,
                    type: att.type,
                    size: att.data ? att.data.length * 0.75 : 0
                })));
            } else if (attachment) {
                attachmentsData = JSON.stringify([{
                    name: attachment.name,
                    type: attachment.type,
                    size: attachment.data ? attachment.data.length * 0.75 : 0
                }]);
            }
            
            const insertQuery = `
                INSERT INTO emails (user_id, recipient, subject, body, template, status, sent_at, error_message, client_id, attachments)
                VALUES (?, ?, ?, ?, ?, 'failed', datetime('now'), ?, ?, ?)
            `;
            
            await database.run(insertQuery, [
                req.user.id,
                req.body.recipient,
                req.body.subject,
                req.body.body,
                req.body.template,
                error.message,
                clientId,
                attachmentsData
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
            SELECT id, recipient, subject, template, status, sent_at, error_message, client_id, attachments
            FROM emails 
            WHERE user_id = ? 
            ORDER BY sent_at DESC 
            LIMIT ? OFFSET ?
        `;

        const emails = await database.all(query, [userId, limit, offset]);
        
        // Parse attachments JSON for each email
        const emailsWithParsedData = emails.map(email => ({
            ...email,
            attachments: email.attachments ? JSON.parse(email.attachments) : null
        }));

        res.json({
            success: true,
            emails: emailsWithParsedData
        });

    } catch (error) {
        console.error('Error fetching email history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch email history'
        });
    }
});

// Get sent beats for a specific client
router.get('/client-beats/:clientId', verifyToken, async (req, res) => {
    try {
        const { clientId } = req.params;
        const userId = req.user.id;

        const query = `
            SELECT id, subject, template, status, sent_at, attachments
            FROM emails 
            WHERE user_id = ? AND client_id = ? AND template = 'beat' AND status = 'sent'
            ORDER BY sent_at DESC
        `;

        const sentBeats = await database.all(query, [userId, clientId]);
        
        // Parse attachments JSON for each beat
        const beatsWithParsedData = sentBeats.map(beat => ({
            ...beat,
            attachments: beat.attachments ? JSON.parse(beat.attachments) : null
        }));

        res.json({
            success: true,
            sentBeats: beatsWithParsedData
        });
    } catch (error) {
        console.error('Error fetching client beats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch client beats'
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
