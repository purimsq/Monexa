const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken } = require('../middleware/auth');
const securityService = require('../services/securityService');
const database = require('../config/database');

const router = express.Router();

// Get client IP address
const getClientIP = (req) => {
    return req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
           req.ip;
};

// Generate 2FA secret
router.post('/2fa/generate', verifyToken, async (req, res) => {
    try {
        const user = await database.get('SELECT email FROM users WHERE id = ?', [req.user.id]);
        const result = await securityService.generate2FASecret(req.user.id, user.email);
        
        res.json(result);
    } catch (error) {
        console.error('Generate 2FA secret error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate 2FA secret'
        });
    }
});

// Enable 2FA
router.post('/2fa/enable', verifyToken, [
    body('token').isLength({ min: 6 }).withMessage('Valid 2FA token required')
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

        const result = await securityService.enable2FA(req.user.id, req.body.token);
        res.json(result);
    } catch (error) {
        console.error('Enable 2FA error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to enable 2FA'
        });
    }
});

// Disable 2FA
router.post('/2fa/disable', verifyToken, [
    body('token').isLength({ min: 6 }).withMessage('Valid 2FA token required')
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

        const result = await securityService.disable2FA(req.user.id, req.body.token);
        res.json(result);
    } catch (error) {
        console.error('Disable 2FA error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to disable 2FA'
        });
    }
});

// Verify 2FA token
router.post('/2fa/verify', verifyToken, [
    body('token').isLength({ min: 6 }).withMessage('Valid 2FA token required')
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

        const result = await securityService.verify2FAToken(req.user.id, req.body.token);
        res.json(result);
    } catch (error) {
        console.error('Verify 2FA error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to verify 2FA token'
        });
    }
});

// Get security logs
router.get('/logs', verifyToken, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const result = await securityService.getSecurityLogs(req.user.id, limit);
        res.json(result);
    } catch (error) {
        console.error('Get security logs error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get security logs'
        });
    }
});

// Get login history
router.get('/login-history', verifyToken, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const result = await securityService.getLoginHistory(req.user.id, limit);
        res.json(result);
    } catch (error) {
        console.error('Get login history error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get login history'
        });
    }
});

// Get security settings
router.get('/settings', verifyToken, async (req, res) => {
    try {
        const settings = await database.get(
            'SELECT two_factor_enabled, login_alerts, session_timeout FROM user_settings WHERE user_id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            settings: {
                twoFactorEnabled: settings?.two_factor_enabled || false,
                loginAlerts: settings?.login_alerts || true,
                sessionTimeout: settings?.session_timeout || 30
            }
        });
    } catch (error) {
        console.error('Get security settings error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get security settings'
        });
    }
});

// Update security settings
router.put('/settings', verifyToken, [
    body('loginAlerts').optional().isBoolean().withMessage('Login alerts must be boolean'),
    body('sessionTimeout').optional().isInt({ min: 5, max: 480 }).withMessage('Session timeout must be between 5 and 480 minutes')
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

        const { loginAlerts, sessionTimeout } = req.body;
        const updates = [];
        const values = [];

        if (loginAlerts !== undefined) {
            updates.push('login_alerts = ?');
            values.push(loginAlerts);
        }

        if (sessionTimeout !== undefined) {
            updates.push('session_timeout = ?');
            values.push(sessionTimeout);
        }

        if (updates.length > 0) {
            values.push(req.user.id);
            await database.run(
                `UPDATE user_settings SET ${updates.join(', ')} WHERE user_id = ?`,
                values
            );

            // Log security event
            await securityService.logSecurityEvent(
                req.user.id, 
                'SECURITY_SETTINGS_UPDATED', 
                'Security settings updated',
                getClientIP(req),
                req.headers['user-agent']
            );
        }

        res.json({
            success: true,
            message: 'Security settings updated successfully'
        });
    } catch (error) {
        console.error('Update security settings error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update security settings'
        });
    }
});

// Validate password strength
router.post('/validate-password', verifyToken, [
    body('password').isLength({ min: 1 }).withMessage('Password is required')
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
        const strength = securityService.validatePasswordStrength(password);
        const compromise = await securityService.checkPasswordCompromise(password);

        res.json({
            success: true,
            strength,
            compromise
        });
    } catch (error) {
        console.error('Validate password error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to validate password'
        });
    }
});

// Get current session info
router.get('/session', verifyToken, async (req, res) => {
    try {
        const session = await database.get(
            `SELECT s.*, u.name, u.email FROM user_sessions s 
             JOIN users u ON s.user_id = u.id 
             WHERE s.id = ?`,
            [req.user.sessionId]
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        res.json({
            success: true,
            session: {
                id: session.id,
                createdAt: session.created_at,
                expiresAt: session.expires_at,
                userAgent: req.headers['user-agent'],
                ipAddress: getClientIP(req)
            }
        });
    } catch (error) {
        console.error('Get session info error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get session info'
        });
    }
});

// Get all user sessions
router.get('/sessions', verifyToken, async (req, res) => {
    try {
        const sessions = await database.query(
            `SELECT s.id, s.created_at, s.expires_at, s.user_agent, s.ip_address
             FROM user_sessions s 
             WHERE s.user_id = ?
             ORDER BY s.created_at DESC`,
            [req.user.id]
        );

        const formattedSessions = (sessions || []).map(session => ({
            id: session.id,
            createdAt: session.created_at,
            expiresAt: session.expires_at,
            userAgent: session.user_agent,
            ipAddress: session.ip_address,
            isCurrent: session.id === req.user.sessionId
        }));

        res.json({
            success: true,
            sessions: formattedSessions
        });
    } catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get sessions'
        });
    }
});

// Revoke specific session
router.post('/revoke-session', verifyToken, [
    body('sessionId').isInt().withMessage('Valid session ID required')
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

        const { sessionId } = req.body;

        // Check if session belongs to user
        const session = await database.get(
            'SELECT id FROM user_sessions WHERE id = ? AND user_id = ?',
            [sessionId, req.user.id]
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        // Don't allow revoking current session
        if (sessionId === req.user.sessionId) {
            return res.status(400).json({
                success: false,
                error: 'Cannot revoke current session'
            });
        }

        // Delete the session
        await database.run(
            'DELETE FROM user_sessions WHERE id = ?',
            [sessionId]
        );

        // Log security event
        await securityService.logSecurityEvent(
            req.user.id,
            'SESSION_REVOKED',
            `Session ${sessionId} revoked`,
            getClientIP(req),
            req.headers['user-agent']
        );

        res.json({
            success: true,
            message: 'Session revoked successfully'
        });
    } catch (error) {
        console.error('Revoke session error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to revoke session'
        });
    }
});

// Revoke all other sessions (logout from all devices)
router.post('/revoke-other-sessions', verifyToken, async (req, res) => {
    try {
        await database.run(
            `DELETE FROM user_sessions 
             WHERE user_id = ? AND id != ?`,
            [req.user.id, req.user.sessionId]
        );

        // Log security event
        await securityService.logSecurityEvent(
            req.user.id,
            'OTHER_SESSIONS_REVOKED',
            'All other sessions revoked',
            getClientIP(req),
            req.headers['user-agent']
        );

        res.json({
            success: true,
            message: 'All other sessions revoked successfully'
        });
    } catch (error) {
        console.error('Revoke other sessions error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to revoke other sessions'
        });
    }
});

// Get security summary
router.get('/summary', verifyToken, async (req, res) => {
    try {
        // Get recent security events
        const recentLogs = await database.all(
            `SELECT event_type, created_at FROM security_logs 
             WHERE user_id = ? 
             ORDER BY created_at DESC 
             LIMIT 10`,
            [req.user.id]
        );

        // Get failed login attempts in last 24 hours
        const failedAttempts = await database.get(
            `SELECT COUNT(*) as count FROM login_attempts 
             WHERE user_id = ? AND success = 0 
             AND created_at > datetime('now', '-1 day')`,
            [req.user.id]
        );

        // Get unique IP addresses used
        const uniqueIPs = await database.all(
            `SELECT DISTINCT ip_address FROM login_attempts 
             WHERE user_id = ? AND success = 1 
             ORDER BY created_at DESC 
             LIMIT 5`,
            [req.user.id]
        );

        // Get 2FA status
        const twoFactorStatus = await database.get(
            'SELECT two_factor_enabled FROM user_settings WHERE user_id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            summary: {
                recentEvents: recentLogs,
                failedAttempts24h: failedAttempts.count,
                recentIPs: uniqueIPs.map(ip => ip.ip_address),
                twoFactorEnabled: twoFactorStatus?.two_factor_enabled || false
            }
        });
    } catch (error) {
        console.error('Get security summary error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get security summary'
        });
    }
});

module.exports = router;
