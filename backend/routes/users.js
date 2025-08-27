const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Update user profile
router.put('/profile', verifyToken, [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').optional().trim(),
    body('location').optional().trim(),
    body('experience').optional().trim(),
    body('bio').optional().trim(),
    body('role').optional().trim(),
    body('currentPassword').exists().withMessage('Current password required for profile updates')
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

        const { name, email, phone, location, experience, bio, role, currentPassword } = req.body;
        
        console.log('Full request body:', req.body);
        console.log('Profile update request:', { name, email, phone, location, experience, bio, role });
        
        // Verify current password
        const user = await database.get(
            'SELECT password FROM users WHERE id = ?',
            [req.user.id]
        );

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }

        // Check if email is being updated and if it's already taken by another user
        if (email !== undefined && email !== req.user.email) {
            const existingUser = await database.get(
                'SELECT id FROM users WHERE email = ? AND id != ?',
                [email, req.user.id]
            );
            
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: 'Email is already taken by another user'
                });
            }
        }

        const updateFields = [];
        const updateValues = [];

        // Build dynamic update query
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
        if (location !== undefined) {
            updateFields.push('location = ?');
            updateValues.push(location);
        }
        if (experience !== undefined) {
            updateFields.push('experience = ?');
            updateValues.push(experience);
        }
        if (bio !== undefined) {
            updateFields.push('bio = ?');
            updateValues.push(bio);
        }
        if (role !== undefined) {
            updateFields.push('role = ?');
            updateValues.push(role);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        updateValues.push(req.user.id);

        console.log('Update query:', `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`);
        console.log('Update values:', updateValues);
        
        await database.run(
            `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        // Get updated user
        const updatedUser = await database.get(
            'SELECT id, name, email, role, phone, location, experience, bio, avatar FROM users WHERE id = ?',
            [req.user.id]
        );

        console.log('Updated user data:', updatedUser);

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update profile'
        });
    }
});

// Verify password
router.post('/verify-password', verifyToken, [
    body('password').notEmpty().withMessage('Password is required')
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

        const { password } = req.body;

        // Get user's current password
        const user = await database.get(
            'SELECT password FROM users WHERE id = ?',
            [req.user.id]
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                error: 'Password is incorrect'
            });
        }

        res.json({
            success: true,
            message: 'Password verified successfully'
        });
    } catch (error) {
        console.error('Password verification error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to verify password'
        });
    }
});

// Change password
router.put('/password', verifyToken, [
    body('currentPassword').exists().withMessage('Current password required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
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

        const { currentPassword, newPassword } = req.body;

        // Get current user with password
        const user = await database.get(
            'SELECT password FROM users WHERE id = ?',
            [req.user.id]
        );

        // Verify current password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Update password
        await database.run(
            'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [hashedNewPassword, req.user.id]
        );

        res.json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to change password'
        });
    }
});

// Get user settings
router.get('/settings', verifyToken, async (req, res) => {
    try {
        const settings = await database.get(
            'SELECT * FROM user_settings WHERE user_id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            settings: settings || {}
        });

    } catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get settings'
        });
    }
});

// Update user settings
router.put('/settings', verifyToken, async (req, res) => {
    try {
        const {
            email_notifications,
            push_notifications,
            sales_notifications,
            message_notifications,
            system_notifications,
            default_currency,
            auto_withdraw,
            payment_reminders,
            two_factor_auth,
            login_alerts,
            session_timeout,
            theme,
            accent_color,
            compact_mode,
            profile_visibility,
            show_online_status,
            allow_messages
        } = req.body;

        // Check if settings exist
        const existingSettings = await database.get(
            'SELECT id FROM user_settings WHERE user_id = ?',
            [req.user.id]
        );

        if (existingSettings) {
            // Update existing settings
            await database.run(
                `UPDATE user_settings SET 
                 email_notifications = COALESCE(?, email_notifications),
                 push_notifications = COALESCE(?, push_notifications),
                 sales_notifications = COALESCE(?, sales_notifications),
                 message_notifications = COALESCE(?, message_notifications),
                 system_notifications = COALESCE(?, system_notifications),
                 default_currency = COALESCE(?, default_currency),
                 auto_withdraw = COALESCE(?, auto_withdraw),
                 payment_reminders = COALESCE(?, payment_reminders),
                 two_factor_auth = COALESCE(?, two_factor_auth),
                 login_alerts = COALESCE(?, login_alerts),
                 session_timeout = COALESCE(?, session_timeout),
                 theme = COALESCE(?, theme),
                 accent_color = COALESCE(?, accent_color),
                 compact_mode = COALESCE(?, compact_mode),
                 profile_visibility = COALESCE(?, profile_visibility),
                 show_online_status = COALESCE(?, show_online_status),
                 allow_messages = COALESCE(?, allow_messages),
                 updated_at = CURRENT_TIMESTAMP
                 WHERE user_id = ?`,
                [
                    email_notifications, push_notifications, sales_notifications,
                    message_notifications, system_notifications, default_currency,
                    auto_withdraw, payment_reminders, two_factor_auth,
                    login_alerts, session_timeout, theme, accent_color,
                    compact_mode, profile_visibility, show_online_status,
                    allow_messages, req.user.id
                ]
            );
        } else {
            // Create new settings
            const { v4: uuidv4 } = require('uuid');
            await database.run(
                `INSERT INTO user_settings (
                    id, user_id, email_notifications, push_notifications,
                    sales_notifications, message_notifications, system_notifications,
                    default_currency, auto_withdraw, payment_reminders,
                    two_factor_auth, login_alerts, session_timeout,
                    theme, accent_color, compact_mode, profile_visibility,
                    show_online_status, allow_messages
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    uuidv4(), req.user.id,
                    email_notifications ?? true, push_notifications ?? true,
                    sales_notifications ?? true, message_notifications ?? true,
                    system_notifications ?? false, default_currency ?? 'USD',
                    auto_withdraw ?? false, payment_reminders ?? true,
                    two_factor_auth ?? false, login_alerts ?? true,
                    session_timeout ?? 30, theme ?? 'light',
                    accent_color ?? '#1a1a1a', compact_mode ?? false,
                    profile_visibility ?? 'public', show_online_status ?? true,
                    allow_messages ?? true
                ]
            );
        }

        // Get updated settings
        const updatedSettings = await database.get(
            'SELECT * FROM user_settings WHERE user_id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            message: 'Settings updated successfully',
            settings: updatedSettings
        });

    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update settings'
        });
    }
});

// Delete account completely
router.delete('/account', verifyToken, [
    body('password').exists().withMessage('Password required for account deletion')
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

        const { password } = req.body;

        // Get current user with password
        const user = await database.get(
            'SELECT password FROM users WHERE id = ?',
            [req.user.id]
        );

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                error: 'Password is incorrect'
            });
        }

        // Begin transaction for complete account deletion
        await database.run('BEGIN TRANSACTION');

        try {
            // Delete all user sessions
            await database.run(
                'DELETE FROM user_sessions WHERE user_id = ?',
                [req.user.id]
            );

            // Delete user settings
            await database.run(
                'DELETE FROM user_settings WHERE user_id = ?',
                [req.user.id]
            );

            // Delete user transactions (if table exists)
            try {
                await database.run(
                    'DELETE FROM transactions WHERE user_id = ?',
                    [req.user.id]
                );
            } catch (error) {
                console.log('Transactions table not found, skipping...');
            }

            // Delete user notifications (if table exists)
            try {
                await database.run(
                    'DELETE FROM notifications WHERE user_id = ?',
                    [req.user.id]
                );
            } catch (error) {
                console.log('Notifications table not found, skipping...');
            }

            // Delete user payments (if table exists)
            try {
                await database.run(
                    'DELETE FROM payments WHERE user_id = ?',
                    [req.user.id]
                );
            } catch (error) {
                console.log('Payments table not found, skipping...');
            }

            // Delete user sales (if table exists)
            try {
                await database.run(
                    'DELETE FROM sales WHERE user_id = ?',
                    [req.user.id]
                );
            } catch (error) {
                console.log('Sales table not found, skipping...');
            }

            // Finally, delete the user account
            await database.run(
                'DELETE FROM users WHERE id = ?',
                [req.user.id]
            );

            // Commit the transaction
            await database.run('COMMIT');

            res.json({
                success: true,
                message: 'Account and all associated data deleted successfully'
            });

        } catch (error) {
            // Rollback on error
            await database.run('ROLLBACK');
            throw error;
        }

    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete account. Please try again later.'
        });
    }
});

// Export user data
router.post('/export-data', verifyToken, [
    body('password').exists().withMessage('Password required for data export')
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

        const { password } = req.body;

        // Get user data with password for verification
        const user = await database.get(
            'SELECT * FROM users WHERE id = ?',
            [req.user.id]
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Verify password before proceeding with export
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                error: 'Password is incorrect. Please try again.'
            });
        }

        // Get user settings
        const userSettings = await database.get(
            'SELECT * FROM user_settings WHERE user_id = ?',
            [req.user.id]
        );

        // Get user sessions
        const userSessions = await database.all(
            'SELECT * FROM user_sessions WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );

        // Get transactions (if table exists)
        let transactions = [];
        try {
            transactions = await database.all(
                'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
                [req.user.id]
            );
        } catch (error) {
            // Transactions table might not exist yet
            console.log('Transactions table not found, skipping...');
        }

        // Get notifications (if table exists)
        let notifications = [];
        try {
            notifications = await database.all(
                'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
                [req.user.id]
            );
        } catch (error) {
            // Notifications table might not exist yet
            console.log('Notifications table not found, skipping...');
        }

        // Prepare data for export (exclude password for security)
        const exportData = {
            profile: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                experience: user.experience,
                bio: user.bio,
                role: user.role,
                avatar: user.avatar,
                created_at: user.created_at,
                updated_at: user.updated_at
                // Password is intentionally excluded for security
            },
            settings: userSettings || {},
            sessions: userSessions,
            transactions: transactions,
            notifications: notifications,
            export_date: new Date().toISOString()
        };

        // Create exports directory if it doesn't exist
        const exportsDir = path.join(__dirname, '../exports');
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const baseFileName = `monexa_export_${user.id}_${timestamp}`;

        // Generate CSV file
        const csvPath = path.join(exportsDir, `${baseFileName}.csv`);
        const csvWriter = createCsvWriter({
            path: csvPath,
            header: [
                { id: 'section', title: 'SECTION' },
                { id: 'field', title: 'FIELD' },
                { id: 'value', title: 'VALUE' }
            ]
        });

        const csvRecords = [];
        
        // Add profile data
        Object.entries(exportData.profile).forEach(([key, value]) => {
            csvRecords.push({
                section: 'PROFILE',
                field: key.toUpperCase(),
                value: value || ''
            });
        });

        // Add settings data
        if (exportData.settings) {
            Object.entries(exportData.settings).forEach(([key, value]) => {
                if (key !== 'id' && key !== 'user_id') {
                    csvRecords.push({
                        section: 'SETTINGS',
                        field: key.toUpperCase(),
                        value: value || ''
                    });
                }
            });
        }

        // Add sessions data
        exportData.sessions.forEach((session, index) => {
            csvRecords.push({
                section: 'SESSIONS',
                field: `SESSION_${index + 1}_IP`,
                value: session.ip_address || ''
            });
            csvRecords.push({
                section: 'SESSIONS',
                field: `SESSION_${index + 1}_CREATED`,
                value: session.created_at || ''
            });
            csvRecords.push({
                section: 'SESSIONS',
                field: `SESSION_${index + 1}_EXPIRES`,
                value: session.expires_at || ''
            });
        });

        // Add transactions data
        exportData.transactions.forEach((transaction, index) => {
            csvRecords.push({
                section: 'TRANSACTIONS',
                field: `TRANSACTION_${index + 1}_TYPE`,
                value: transaction.type || ''
            });
            csvRecords.push({
                section: 'TRANSACTIONS',
                field: `TRANSACTION_${index + 1}_AMOUNT`,
                value: transaction.amount || ''
            });
            csvRecords.push({
                section: 'TRANSACTIONS',
                field: `TRANSACTION_${index + 1}_STATUS`,
                value: transaction.status || ''
            });
            csvRecords.push({
                section: 'TRANSACTIONS',
                field: `TRANSACTION_${index + 1}_CREATED`,
                value: transaction.created_at || ''
            });
        });

        await csvWriter.writeRecords(csvRecords);

        // Generate PDF file
        const pdfPath = path.join(exportsDir, `${baseFileName}.pdf`);
        const doc = new PDFDocument();

        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);

        // PDF Header
        doc.fontSize(24).text('Monexa Data Export', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
        doc.moveDown(2);

        // Profile Section
        doc.fontSize(18).text('PROFILE INFORMATION', { underline: true });
        doc.moveDown();
        doc.fontSize(12);
        doc.text(`Name: ${exportData.profile.name || 'N/A'}`);
        doc.text(`Email: ${exportData.profile.email || 'N/A'}`);
        doc.text(`Phone: ${exportData.profile.phone || 'N/A'}`);
        doc.text(`Location: ${exportData.profile.location || 'N/A'}`);
        doc.text(`Role: ${exportData.profile.role || 'N/A'}`);
        doc.text(`Experience: ${exportData.profile.experience || 'N/A'}`);
        doc.text(`Bio: ${exportData.profile.bio || 'N/A'}`);
        doc.text(`Member Since: ${new Date(exportData.profile.created_at).toLocaleDateString()}`);
        doc.moveDown(2);

        // Settings Section
        if (exportData.settings) {
            doc.fontSize(18).text('ACCOUNT SETTINGS', { underline: true });
            doc.moveDown();
            doc.fontSize(12);
            doc.text(`Email Notifications: ${exportData.settings.email_notifications ? 'Enabled' : 'Disabled'}`);
            doc.text(`Push Notifications: ${exportData.settings.push_notifications ? 'Enabled' : 'Disabled'}`);
            doc.text(`Default Currency: ${exportData.settings.default_currency || 'USD'}`);
            doc.text(`Theme: ${exportData.settings.theme || 'light'}`);
            doc.text(`Profile Visibility: ${exportData.settings.profile_visibility || 'public'}`);
            doc.moveDown(2);
        }

        // Sessions Section
        doc.fontSize(18).text('ACTIVE SESSIONS', { underline: true });
        doc.moveDown();
        doc.fontSize(12);
        exportData.sessions.forEach((session, index) => {
            doc.text(`Session ${index + 1}:`);
            doc.text(`  IP Address: ${session.ip_address || 'N/A'}`);
            doc.text(`  Created: ${new Date(session.created_at).toLocaleString()}`);
            doc.text(`  Expires: ${new Date(session.expires_at).toLocaleString()}`);
            doc.moveDown();
        });

        // Transactions Section
        if (exportData.transactions.length > 0) {
            doc.fontSize(18).text('TRANSACTION HISTORY', { underline: true });
            doc.moveDown();
            doc.fontSize(12);
            exportData.transactions.forEach((transaction, index) => {
                doc.text(`Transaction ${index + 1}:`);
                doc.text(`  Type: ${transaction.type || 'N/A'}`);
                doc.text(`  Amount: ${transaction.amount || 'N/A'}`);
                doc.text(`  Status: ${transaction.status || 'N/A'}`);
                doc.text(`  Date: ${new Date(transaction.created_at).toLocaleString()}`);
                doc.moveDown();
            });
        }

        doc.end();

        // Wait for PDF to be written
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        // Send email with attachments
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: user.email,
            subject: 'Monexa - Your Data Export',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a1a1a;">Monexa Data Export</h2>
                    <p>Hello ${user.name},</p>
                    <p>Your data export has been completed successfully. Please find your data attached in both CSV and PDF formats.</p>
                    
                    <h3 style="color: #333;">What's included in your export:</h3>
                    <ul>
                        <li><strong>Profile Information:</strong> Your personal details and account information</li>
                        <li><strong>Account Settings:</strong> Your preferences and configuration</li>
                        <li><strong>Active Sessions:</strong> Your logged-in devices and sessions</li>
                        <li><strong>Transaction History:</strong> Your payment and sales records</li>
                        <li><strong>Notifications:</strong> Your notification history</li>
                    </ul>
                    
                    <p><strong>Export Date:</strong> ${new Date().toLocaleString()}</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; color: #666;">
                            <strong>Note:</strong> This export contains your personal data. Please keep it secure and delete it when no longer needed.
                        </p>
                    </div>
                    
                    <p>If you have any questions about your data export, please contact our support team.</p>
                    
                    <p>Best regards,<br>The Monexa Team</p>
                </div>
            `,
            attachments: [
                {
                    filename: `${baseFileName}.csv`,
                    path: csvPath
                },
                {
                    filename: `${baseFileName}.pdf`,
                    path: pdfPath
                }
            ]
        };

        console.log(`Attempting to send export email to: ${user.email}`);
        
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Export email sent successfully to: ${user.email}`);
        } catch (emailError) {
            console.error('Export email error:', emailError);
            throw new Error('Failed to send export email');
        }

        // Clean up files after sending
        setTimeout(() => {
            if (fs.existsSync(csvPath)) fs.unlinkSync(csvPath);
            if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
        }, 60000); // Delete after 1 minute

        res.json({
            success: true,
            message: 'Data export completed successfully. Check your email for the exported files.',
            email: user.email
        });

    } catch (error) {
        console.error('Export data error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export data. Please try again later.'
        });
    }
});

module.exports = router;
