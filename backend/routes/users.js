const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Update user profile
router.put('/profile', verifyToken, [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
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

        const { name, phone, location, experience, bio, role, currentPassword } = req.body;
        
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

        const updateFields = [];
        const updateValues = [];

        // Build dynamic update query
        if (name !== undefined) {
            updateFields.push('name = ?');
            updateValues.push(name);
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

        await database.run(
            `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        // Get updated user
        const updatedUser = await database.get(
            'SELECT id, name, email, role, phone, location, experience, bio, avatar FROM users WHERE id = ?',
            [req.user.id]
        );

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

// Deactivate account
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

        // Deactivate account (don't delete, just mark as inactive)
        await database.run(
            'UPDATE users SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [req.user.id]
        );

        // Delete all user sessions
        await database.run(
            'DELETE FROM user_sessions WHERE user_id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            message: 'Account deactivated successfully'
        });

    } catch (error) {
        console.error('Deactivate account error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to deactivate account'
        });
    }
});

module.exports = router;
