const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');
const { generateToken, verifyToken, checkSessionTimeout } = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// User registration
router.post('/signup', [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().trim()
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

        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await database.get(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate user ID and avatar
        const userId = uuidv4();
        const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase();

        // Create user
        await database.run(
            `INSERT INTO users (id, name, email, password, role, avatar, bio) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                name,
                email,
                hashedPassword,
                role || 'Music Producer',
                avatar,
                `Professional ${role || 'music producer'} passionate about creating amazing music.`
            ]
        );

        // Create default user settings
        await database.run(
            `INSERT INTO user_settings (id, user_id) VALUES (?, ?)`,
            [uuidv4(), userId]
        );

        // Create session
        const sessionId = uuidv4();
        const token = generateToken(userId, sessionId);
        
        await database.run(
            `INSERT INTO user_sessions (id, user_id, token, expires_at) 
             VALUES (?, ?, ?, datetime('now', '+30 days'))`,
            [sessionId, userId, token]
        );

        // Get user data for response
        const user = await database.get(
            'SELECT id, name, email, role, phone, location, experience, bio, avatar FROM users WHERE id = ?',
            [userId]
        );

        // Send welcome email (async, don't wait for it)
        emailService.sendWelcomeEmail(email, name).catch(error => {
            console.error('Failed to send welcome email:', error);
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
            token
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to register user'
        });
    }
});

// User login
router.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').exists().withMessage('Password required')
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

        const { email, password } = req.body;

        // Get user
        const user = await database.get(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        if (!user.is_active) {
            return res.status(401).json({
                success: false,
                error: 'Account is deactivated'
            });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Create session
        const sessionId = uuidv4();
        const token = generateToken(user.id, sessionId);
        
        await database.run(
            `INSERT INTO user_sessions (id, user_id, token, expires_at) 
             VALUES (?, ?, ?, datetime('now', '+30 days'))`,
            [sessionId, user.id, token]
        );

        // Remove password from response
        delete user.password;

        res.json({
            success: true,
            message: 'Login successful',
            user,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});

// User logout
router.post('/logout', verifyToken, async (req, res) => {
    try {
        // Delete current session
        await database.run(
            'DELETE FROM user_sessions WHERE id = ?',
            [req.user.sessionId]
        );

        res.json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Logout failed'
        });
    }
});

// Refresh session
router.post('/refresh', verifyToken, async (req, res) => {
    try {
        // Update session timeout
        await checkSessionTimeout(req.user.id);

        res.json({
            success: true,
            message: 'Session refreshed',
            user: req.user
        });

    } catch (error) {
        console.error('Refresh error:', error);
        res.status(500).json({
            success: false,
            error: 'Session refresh failed'
        });
    }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await database.get(
            'SELECT id, name, email, role, phone, location, experience, bio, avatar, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get user data'
        });
    }
});

// Request password reset
router.post('/forgot-password', [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required')
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

        const { email } = req.body;

        // Check if user exists
        const user = await database.get(
            'SELECT id, name, email FROM users WHERE email = ?',
            [email]
        );

        if (!user) {
            // Don't reveal if email exists or not for security
            return res.json({
                success: true,
                message: 'If the email exists, a password reset link has been sent'
            });
        }

        // Generate reset token
        const resetToken = uuidv4();
        const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Store reset token
        await database.run(
            `INSERT INTO password_resets (id, user_id, token, expires_at) 
             VALUES (?, ?, ?, ?)`,
            [uuidv4(), user.id, resetToken, resetExpiry.toISOString()]
        );

        // Send password reset email using current user email
        const userEmail = await emailService.getUserEmail(user.id);
        const emailSent = userEmail ? await emailService.sendPasswordResetEmail(userEmail, user.name, resetToken) : false;
        
        if (emailSent) {
            console.log(`Password reset email sent to ${email}`);
        }

        res.json({
            success: true,
            message: 'If the email exists, a password reset link has been sent'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process password reset request'
        });
    }
});

// Reset password with token
router.post('/reset-password', [
    body('token').notEmpty().withMessage('Reset token required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
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

        const { token, password } = req.body;

        // Find valid reset token
        const resetRecord = await database.get(
            `SELECT pr.*, u.email, u.name 
             FROM password_resets pr 
             JOIN users u ON pr.user_id = u.id 
             WHERE pr.token = ? AND pr.expires_at > datetime('now') AND pr.used = 0`,
            [token]
        );

        if (!resetRecord) {
            return res.status(400).json({
                success: false,
                error: 'Invalid or expired reset token'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user password
        await database.run(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, resetRecord.user_id]
        );

        // Mark reset token as used
        await database.run(
            'UPDATE password_resets SET used = 1 WHERE id = ?',
            [resetRecord.id]
        );

        // Invalidate all existing sessions for this user
        await database.run(
            'DELETE FROM user_sessions WHERE user_id = ?',
            [resetRecord.user_id]
        );

        res.json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to reset password'
        });
    }
});

// Verify reset token
router.get('/verify-reset-token/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const resetRecord = await database.get(
            `SELECT pr.*, u.email 
             FROM password_resets pr 
             JOIN users u ON pr.user_id = u.id 
             WHERE pr.token = ? AND pr.expires_at > datetime('now') AND pr.used = 0`,
            [token]
        );

        if (!resetRecord) {
            return res.status(400).json({
                success: false,
                error: 'Invalid or expired reset token'
            });
        }

        res.json({
            success: true,
            message: 'Reset token is valid'
        });

    } catch (error) {
        console.error('Verify reset token error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to verify reset token'
        });
    }
});

module.exports = router;
