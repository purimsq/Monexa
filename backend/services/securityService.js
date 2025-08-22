const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const bcrypt = require('bcryptjs');
const database = require('../config/database');

class SecurityService {
    // Generate 2FA secret for a user
    async generate2FASecret(userId, userEmail) {
        try {
            const secret = speakeasy.generateSecret({
                name: `Monexa (${userEmail})`,
                issuer: 'Monexa',
                length: 32
            });

            // Store the secret in database
            await database.run(
                'UPDATE user_settings SET two_factor_secret = ?, two_factor_enabled = 0 WHERE user_id = ?',
                [secret.base32, userId]
            );

            // Generate QR code
            const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

            return {
                success: true,
                secret: secret.base32,
                qrCode: qrCodeUrl,
                otpauthUrl: secret.otpauth_url
            };
        } catch (error) {
            console.error('Generate 2FA secret error:', error);
            return { success: false, error: 'Failed to generate 2FA secret' };
        }
    }

    // Verify 2FA token
    async verify2FAToken(userId, token) {
        try {
            // Get user's 2FA secret
            const settings = await database.get(
                'SELECT two_factor_secret, two_factor_enabled FROM user_settings WHERE user_id = ?',
                [userId]
            );

            if (!settings || !settings.two_factor_secret || !settings.two_factor_enabled) {
                return { success: false, error: '2FA not enabled' };
            }

            // Verify the token
            const verified = speakeasy.totp.verify({
                secret: settings.two_factor_secret,
                encoding: 'base32',
                token: token,
                window: 2 // Allow 2 time steps in case of clock skew
            });

            return { success: verified };
        } catch (error) {
            console.error('Verify 2FA token error:', error);
            return { success: false, error: 'Failed to verify 2FA token' };
        }
    }

    // Enable 2FA for a user
    async enable2FA(userId, token) {
        try {
            // Get user's 2FA secret (don't check if enabled yet)
            const settings = await database.get(
                'SELECT two_factor_secret FROM user_settings WHERE user_id = ?',
                [userId]
            );

            if (!settings || !settings.two_factor_secret) {
                return { success: false, error: '2FA secret not found. Please generate a new 2FA secret first.' };
            }

            // Verify the token without checking enabled status
            const verified = speakeasy.totp.verify({
                secret: settings.two_factor_secret,
                encoding: 'base32',
                token: token,
                window: 2 // Allow 2 time steps in case of clock skew
            });

            if (!verified) {
                return { success: false, error: 'Invalid verification code' };
            }

            // Enable 2FA
            await database.run(
                'UPDATE user_settings SET two_factor_enabled = 1 WHERE user_id = ?',
                [userId]
            );

            // Log security event
            await this.logSecurityEvent(userId, '2FA_ENABLED', 'Two-factor authentication enabled');

            return { success: true, message: '2FA enabled successfully' };
        } catch (error) {
            console.error('Enable 2FA error:', error);
            return { success: false, error: 'Failed to enable 2FA' };
        }
    }

    // Disable 2FA for a user
    async disable2FA(userId, token) {
        try {
            const verification = await this.verify2FAToken(userId, token);
            if (!verification.success) {
                return verification;
            }

            // Disable 2FA
            await database.run(
                'UPDATE user_settings SET two_factor_enabled = 0, two_factor_secret = NULL WHERE user_id = ?',
                [userId]
            );

            // Log security event
            await this.logSecurityEvent(userId, '2FA_DISABLED', 'Two-factor authentication disabled');

            return { success: true, message: '2FA disabled successfully' };
        } catch (error) {
            console.error('Disable 2FA error:', error);
            return { success: false, error: 'Failed to disable 2FA' };
        }
    }

    // Log security events
    async logSecurityEvent(userId, eventType, description, ipAddress = null, userAgent = null) {
        try {
            await database.run(
                `INSERT INTO security_logs (id, user_id, event_type, description, ip_address, user_agent, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
                [
                    require('uuid').v4(),
                    userId,
                    eventType,
                    description,
                    ipAddress,
                    userAgent
                ]
            );
        } catch (error) {
            console.error('Log security event error:', error);
        }
    }

    // Track login attempts
    async trackLoginAttempt(email, ipAddress, userAgent, success) {
        try {
            const user = await database.get('SELECT id FROM users WHERE email = ?', [email]);
            const userId = user ? user.id : null;

            await database.run(
                `INSERT INTO login_attempts (id, user_id, email, ip_address, user_agent, success, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
                [
                    require('uuid').v4(),
                    userId,
                    email,
                    ipAddress,
                    userAgent,
                    success ? 1 : 0
                ]
            );

            // Log security event if user exists
            if (userId) {
                const eventType = success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED';
                const description = success ? 'Successful login' : 'Failed login attempt';
                await this.logSecurityEvent(userId, eventType, description, ipAddress, userAgent);
            }

            return true;
        } catch (error) {
            console.error('Track login attempt error:', error);
            return false;
        }
    }

    // Check for suspicious login activity
    async checkSuspiciousActivity(email, ipAddress) {
        try {
            // Check for multiple failed attempts from same IP
            const failedAttempts = await database.get(
                `SELECT COUNT(*) as count FROM login_attempts 
                 WHERE email = ? AND ip_address = ? AND success = 0 
                 AND created_at > datetime('now', '-15 minutes')`,
                [email, ipAddress]
            );

            if (failedAttempts.count >= 5) {
                return {
                    suspicious: true,
                    reason: 'Too many failed login attempts',
                    action: 'BLOCK_TEMPORARILY'
                };
            }

            // Check for login from new location (if user exists)
            const user = await database.get('SELECT id FROM users WHERE email = ?', [email]);
            if (user) {
                const previousLogins = await database.get(
                    `SELECT ip_address FROM login_attempts 
                     WHERE user_id = ? AND success = 1 
                     ORDER BY created_at DESC LIMIT 1`,
                    [user.id]
                );

                if (previousLogins && previousLogins.ip_address !== ipAddress) {
                    return {
                        suspicious: true,
                        reason: 'Login from new location',
                        action: 'REQUIRE_2FA'
                    };
                }
            }

            return { suspicious: false };
        } catch (error) {
            console.error('Check suspicious activity error:', error);
            return { suspicious: false };
        }
    }

    // Get security logs for a user
    async getSecurityLogs(userId, limit = 50) {
        try {
            const logs = await database.all(
                `SELECT * FROM security_logs 
                 WHERE user_id = ? 
                 ORDER BY created_at DESC 
                 LIMIT ?`,
                [userId, limit]
            );

            return { success: true, logs };
        } catch (error) {
            console.error('Get security logs error:', error);
            return { success: false, error: 'Failed to get security logs' };
        }
    }

    // Get login history for a user
    async getLoginHistory(userId, limit = 50) {
        try {
            const history = await database.all(
                `SELECT * FROM login_attempts 
                 WHERE user_id = ? 
                 ORDER BY created_at DESC 
                 LIMIT ?`,
                [userId, limit]
            );

            return { success: true, history };
        } catch (error) {
            console.error('Get login history error:', error);
            return { success: false, error: 'Failed to get login history' };
        }
    }

    // Validate password strength
    validatePasswordStrength(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const score = Object.values(requirements).filter(Boolean).length;
        let strength = 'weak';
        if (score >= 4) strength = 'strong';
        else if (score >= 3) strength = 'medium';

        return {
            strength,
            score,
            requirements,
            valid: score >= 3
        };
    }

    // Check if password has been compromised (basic check)
    async checkPasswordCompromise(password) {
        // This is a basic implementation
        // In production, you might want to use a service like HaveIBeenPwned
        const commonPasswords = [
            'password', '123456', '123456789', 'qwerty', 'abc123',
            'password123', 'admin', 'letmein', 'welcome', 'monkey'
        ];

        return {
            compromised: commonPasswords.includes(password.toLowerCase()),
            reason: commonPasswords.includes(password.toLowerCase()) ? 'Common password detected' : null
        };
    }

    // Clean old security logs
    async cleanOldLogs() {
        try {
            // Keep logs for 90 days
            await database.run(
                "DELETE FROM security_logs WHERE created_at < datetime('now', '-90 days')"
            );
            await database.run(
                "DELETE FROM login_attempts WHERE created_at < datetime('now', '-90 days')"
            );
        } catch (error) {
            console.error('Clean old logs error:', error);
        }
    }
}

module.exports = new SecurityService();
