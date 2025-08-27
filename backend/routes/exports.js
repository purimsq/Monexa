const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// Ensure exports directory exists
const ensureExportsDir = async () => {
    const exportsDir = path.join(__dirname, '..', 'exports');
    try {
        await fs.access(exportsDir);
    } catch {
        await fs.mkdir(exportsDir, { recursive: true });
    }
    return exportsDir;
};

// Generate CSV from data
const generateCSV = (data, headers) => {
    if (!data || data.length === 0) {
        return headers.join(',') + '\n';
    }

    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
        headers.map(header => {
            const value = row[header] || '';
            // Escape quotes and wrap in quotes if contains comma
            return typeof value === 'string' && value.includes(',') 
                ? `"${value.replace(/"/g, '""')}"` 
                : value;
        }).join(',')
    );

    return csvHeaders + '\n' + csvRows.join('\n');
};

// Send email using email service
const sendExportEmail = (userEmail, userName, exportType, filePath = null) => {
    return emailService.sendExportEmail(userEmail, userName, exportType, filePath);
};

// Request data export
router.post('/request', verifyToken, [
    body('type').isIn(['transactions', 'documents', 'profile', 'cards', 'all']).withMessage('Invalid export type'),
    body('format').isIn(['csv', 'json']).withMessage('Invalid export format')
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

        const { type, format } = req.body;
        const exportId = uuidv4();

        // Create export request record
        await database.run(
            `INSERT INTO export_requests (id, user_id, type, format, status) 
             VALUES (?, ?, ?, ?, 'pending')`,
            [exportId, req.user.id, type, format]
        );

        // Process export asynchronously
        processExportRequest(exportId, req.user);

        res.status(202).json({
            success: true,
            message: 'Export request submitted successfully',
            exportId,
            estimatedTime: '2-5 minutes'
        });

    } catch (error) {
        console.error('Export request error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit export request'
        });
    }
});

// Process export request (async function)
const processExportRequest = async (exportId, user) => {
    try {
        // Update status to processing
        await database.run(
            'UPDATE export_requests SET status = "processing" WHERE id = ?',
            [exportId]
        );

        const exportRequest = await database.get(
            'SELECT * FROM export_requests WHERE id = ?',
            [exportId]
        );

        const { type, format } = exportRequest;
        const exportsDir = await ensureExportsDir();
        
        let exportData = {};
        let fileName = `monexa_${type}_${Date.now()}.${format}`;
        let filePath = path.join(exportsDir, fileName);

        // Gather data based on export type
        switch (type) {
            case 'transactions':
                exportData.transactions = await database.query(
                    `SELECT t.*, c.type as card_type 
                     FROM transactions t 
                     LEFT JOIN cards c ON t.card_id = c.id 
                     WHERE t.user_id = ? 
                     ORDER BY t.created_at DESC`,
                    [user.id]
                );
                break;

            case 'cards':
                exportData.cards = await database.query(
                    `SELECT id, type, holder_name, expiry_month, expiry_year, 
                            is_default, is_active, created_at 
                     FROM cards 
                     WHERE user_id = ? 
                     ORDER BY created_at DESC`,
                    [user.id]
                );
                break;

            case 'documents':
                exportData.documents = await database.query(
                    'SELECT * FROM documents WHERE user_id = ? ORDER BY created_at DESC',
                    [user.id]
                );
                break;

            case 'profile':
                exportData.profile = await database.get(
                    'SELECT id, name, email, role, phone, location, experience, bio, avatar, created_at FROM users WHERE id = ?',
                    [user.id]
                );
                exportData.settings = await database.get(
                    'SELECT * FROM user_settings WHERE user_id = ?',
                    [user.id]
                );
                break;

            case 'all':
                exportData.profile = await database.get(
                    'SELECT id, name, email, role, phone, location, experience, bio, avatar, created_at FROM users WHERE id = ?',
                    [user.id]
                );
                exportData.settings = await database.get(
                    'SELECT * FROM user_settings WHERE user_id = ?',
                    [user.id]
                );
                exportData.transactions = await database.query(
                    `SELECT t.*, c.type as card_type 
                     FROM transactions t 
                     LEFT JOIN cards c ON t.card_id = c.id 
                     WHERE t.user_id = ? 
                     ORDER BY t.created_at DESC`,
                    [user.id]
                );
                exportData.cards = await database.query(
                    `SELECT id, type, holder_name, expiry_month, expiry_year, 
                            is_default, is_active, created_at 
                     FROM cards 
                     WHERE user_id = ? 
                     ORDER BY created_at DESC`,
                    [user.id]
                );
                exportData.documents = await database.query(
                    'SELECT * FROM documents WHERE user_id = ? ORDER BY created_at DESC',
                    [user.id]
                );
                break;
        }

        // Generate file based on format
        let fileContent = '';
        if (format === 'json') {
            fileContent = JSON.stringify(exportData, null, 2);
        } else if (format === 'csv') {
            if (type === 'transactions' && exportData.transactions) {
                const headers = ['id', 'type', 'category', 'title', 'description', 'amount', 'currency', 'status', 'reference', 'card_type', 'created_at'];
                fileContent = generateCSV(exportData.transactions, headers);
            } else if (type === 'cards' && exportData.cards) {
                const headers = ['id', 'type', 'holder_name', 'expiry_month', 'expiry_year', 'is_default', 'is_active', 'created_at'];
                fileContent = generateCSV(exportData.cards, headers);
            } else if (type === 'documents' && exportData.documents) {
                const headers = ['id', 'title', 'description', 'file_name', 'file_type', 'category', 'is_public', 'created_at'];
                fileContent = generateCSV(exportData.documents, headers);
            } else {
                // For profile or all, create multiple CSV sections
                fileContent = 'Monexa Data Export\n';
                fileContent += `Generated: ${new Date().toISOString()}\n`;
                fileContent += `User: ${user.name} (${user.email})\n\n`;
                
                Object.keys(exportData).forEach(key => {
                    if (Array.isArray(exportData[key]) && exportData[key].length > 0) {
                        fileContent += `\n=== ${key.toUpperCase()} ===\n`;
                        const headers = Object.keys(exportData[key][0]);
                        fileContent += generateCSV(exportData[key], headers) + '\n';
                    } else if (typeof exportData[key] === 'object' && exportData[key]) {
                        fileContent += `\n=== ${key.toUpperCase()} ===\n`;
                        const headers = Object.keys(exportData[key]);
                        fileContent += generateCSV([exportData[key]], headers) + '\n';
                    }
                });
            }
        }

        // Write file
        await fs.writeFile(filePath, fileContent, 'utf8');

        // Update export request with file path
        await database.run(
            `UPDATE export_requests SET 
             status = "completed", 
             file_path = ?, 
             completed_at = CURRENT_TIMESTAMP 
             WHERE id = ?`,
            [filePath, exportId]
        );

        // Send email notification
        const userEmail = await emailService.getUserEmail(user.id);
        console.log(`Attempting to send export email to: ${userEmail} for user: ${user.name}`);
        
        let emailSent = false;
        if (userEmail) {
            try {
                emailSent = await sendExportEmail(userEmail, user.name, type, filePath);
                console.log(`Export email sent successfully: ${emailSent}`);
            } catch (emailError) {
                console.error('Export email error:', emailError);
                emailSent = false;
            }
        } else {
            console.log('No user email found, skipping email notification');
        }
        
        if (emailSent) {
            await database.run(
                'UPDATE export_requests SET email_sent = 1 WHERE id = ?',
                [exportId]
            );
            console.log(`Updated export request ${exportId} with email_sent = 1`);
        } else {
            console.log(`Export email failed for request ${exportId}`);
        }

        console.log(`Export completed successfully for user ${user.id}, type: ${type}`);

    } catch (error) {
        console.error('Export processing error:', error);
        
        // Update status to failed
        await database.run(
            'UPDATE export_requests SET status = "failed" WHERE id = ?',
            [exportId]
        );
    }
};

// Get export status
router.get('/status/:exportId', verifyToken, async (req, res) => {
    try {
        const { exportId } = req.params;

        const exportRequest = await database.get(
            'SELECT * FROM export_requests WHERE id = ? AND user_id = ?',
            [exportId, req.user.id]
        );

        if (!exportRequest) {
            return res.status(404).json({
                success: false,
                error: 'Export request not found'
            });
        }

        res.json({
            success: true,
            export: {
                id: exportRequest.id,
                type: exportRequest.type,
                format: exportRequest.format,
                status: exportRequest.status,
                emailSent: !!exportRequest.email_sent,
                createdAt: exportRequest.created_at,
                completedAt: exportRequest.completed_at
            }
        });

    } catch (error) {
        console.error('Get export status error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get export status'
        });
    }
});

// Get user's export history
router.get('/history', verifyToken, async (req, res) => {
    try {
        const exports = await database.query(
            `SELECT id, type, format, status, email_sent, created_at, completed_at 
             FROM export_requests 
             WHERE user_id = ? 
             ORDER BY created_at DESC 
             LIMIT 50`,
            [req.user.id]
        );

        res.json({
            success: true,
            exports
        });

    } catch (error) {
        console.error('Get export history error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get export history'
        });
    }
});

// Download export file
router.get('/download/:exportId', verifyToken, async (req, res) => {
    try {
        const { exportId } = req.params;

        const exportRequest = await database.get(
            'SELECT * FROM export_requests WHERE id = ? AND user_id = ?',
            [exportId, req.user.id]
        );

        if (!exportRequest) {
            return res.status(404).json({
                success: false,
                error: 'Export request not found'
            });
        }

        if (exportRequest.status !== 'completed' || !exportRequest.file_path) {
            return res.status(400).json({
                success: false,
                error: 'Export file not available'
            });
        }

        // Check if file exists
        try {
            await fs.access(exportRequest.file_path);
        } catch {
            return res.status(404).json({
                success: false,
                error: 'Export file not found'
            });
        }

        // Send file
        const fileName = `monexa_${exportRequest.type}_export.${exportRequest.format}`;
        res.download(exportRequest.file_path, fileName);

    } catch (error) {
        console.error('Download export error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to download export'
        });
    }
});

module.exports = router;
