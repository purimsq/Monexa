const jwt = require('jsonwebtoken');
const database = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Generate JWT token
const generateToken = (userId, sessionId) => {
    return jwt.sign(
        { userId, sessionId },
        JWT_SECRET,
        { expiresIn: '30d' }
    );
};

// Verify JWT token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                error: 'Access token required' 
            });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if session exists and is valid
        const session = await database.get(
            `SELECT s.*, u.* FROM user_sessions s 
             JOIN users u ON s.user_id = u.id 
             WHERE s.id = ? AND s.token = ? AND s.expires_at > datetime('now')`,
            [decoded.sessionId, token]
        );

        if (!session) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid or expired session' 
            });
        }

        if (!session.is_active) {
            return res.status(401).json({ 
                success: false, 
                error: 'Account is deactivated' 
            });
        }

        // Add user info to request
        req.user = {
            id: session.user_id,
            name: session.name,
            email: session.email,
            role: session.role,
            phone: session.phone,
            location: session.location,
            experience: session.experience,
            bio: session.bio,
            avatar: session.avatar,
            sessionId: session.id
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ 
            success: false, 
            error: 'Invalid token' 
        });
    }
};

// Optional auth middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            await verifyToken(req, res, next);
        } else {
            next();
        }
    } catch (error) {
        next();
    }
};

// Check session timeout
const checkSessionTimeout = async (userId) => {
    try {
        // Get user settings
        const settings = await database.get(
            'SELECT session_timeout FROM user_settings WHERE user_id = ?',
            [userId]
        );

        const timeoutMinutes = settings?.session_timeout || 30;
        
        // Update session expiry
        await database.run(
            `UPDATE user_sessions 
             SET expires_at = datetime('now', '+${timeoutMinutes} minutes') 
             WHERE user_id = ? AND expires_at > datetime('now')`,
            [userId]
        );

        return true;
    } catch (error) {
        console.error('Session timeout check error:', error);
        return false;
    }
};

// Clean expired sessions
const cleanExpiredSessions = async () => {
    try {
        await database.run(
            "DELETE FROM user_sessions WHERE expires_at <= datetime('now')"
        );
    } catch (error) {
        console.error('Clean expired sessions error:', error);
    }
};

// Run cleanup every hour
setInterval(cleanExpiredSessions, 60 * 60 * 1000);

module.exports = {
    generateToken,
    verifyToken,
    optionalAuth,
    checkSessionTimeout,
    cleanExpiredSessions
};
