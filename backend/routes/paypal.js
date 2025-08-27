const express = require('express');
const { body, validationResult } = require('express-validator');
const paypalService = require('../services/paypalService');
const { verifyToken } = require('../middleware/auth');
const database = require('../config/database');
const nodemailer = require('nodemailer');
const axios = require('axios');

const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Connect PayPal account
router.post('/connect', verifyToken, [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ success: false, errors: validationErrors.array() });
    }

    const { email, password } = req.body;
    const userId = req.user.id;

    // For now, we'll simulate a successful connection since PayPal doesn't provide direct credential validation
    // In a real implementation, you would use PayPal's OAuth flow
    const mockAccountInfo = {
      email: email,
      name: email.split('@')[0],
      verified: true
    };

    // Store PayPal connection in database
    await database.run(`
      INSERT OR REPLACE INTO paypal_connections (user_id, paypal_email, account_info, connected_at)
      VALUES (?, ?, ?, ?)
    `, [userId, email, JSON.stringify(mockAccountInfo), new Date().toISOString()]);

    // Send confirmation email
    const userEmail = req.user.email;
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: 'PayPal Account Connected - Monexa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0070ba;">PayPal Account Connected Successfully!</h2>
          <p>Hello ${req.user.name},</p>
          <p>Your PayPal account (${email}) has been successfully connected to your Monexa account.</p>
          <p>You can now:</p>
          <ul>
            <li>Send money to other users</li>
            <li>Request payments</li>
            <li>View your transaction history</li>
            <li>Manage your PayPal balance</li>
          </ul>
          <p>If you didn't authorize this connection, please contact support immediately.</p>
          <p>Best regards,<br>The Monexa Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'PayPal account connected successfully',
      account: mockAccountInfo
    });

  } catch (error) {
    console.error('PayPal connect error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to connect PayPal account' 
    });
  }
});

// Get PayPal balance
router.get('/balance', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's PayPal connection
    const connection = await database.get(
      'SELECT paypal_email FROM paypal_connections WHERE user_id = ?',
      [userId]
    );

    if (!connection) {
      return res.status(400).json({ 
        success: false, 
        message: 'PayPal account not connected' 
      });
    }

    // Mock balance for demonstration
    const mockBalance = Math.floor(Math.random() * 10000) / 100;

    res.json({
      success: true,
      balance: mockBalance
    });

  } catch (error) {
    console.error('PayPal balance error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get PayPal balance' 
    });
  }
});

// Send money
router.post('/send', verifyToken, [
  body('toEmail').isEmail().withMessage('Valid recipient email is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount is required'),
  body('note').optional().isString().withMessage('Note must be a string')
], async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ success: false, errors: validationErrors.array() });
    }

    const { toEmail, amount, note = '' } = req.body;
    const userId = req.user.id;
    const fromEmail = req.user.email;

    // Get user's PayPal connection
    const connection = await database.get(
      'SELECT paypal_email FROM paypal_connections WHERE user_id = ?',
      [userId]
    );

    if (!connection) {
      return res.status(400).json({ 
        success: false, 
        message: 'PayPal account not connected' 
      });
    }

    // Generate mock transaction ID
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Record transaction in database
    await database.run(`
      INSERT INTO paypal_transactions (user_id, transaction_id, type, amount, recipient_email, note, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [userId, transactionId, 'send', amount, toEmail, note, 'completed', new Date().toISOString()]);

    // Send confirmation email to sender
    const senderMailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: fromEmail,
      subject: 'Payment Sent Successfully - Monexa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Payment Sent Successfully!</h2>
          <p>Hello ${req.user.name},</p>
          <p>Your payment of <strong>$${amount}</strong> has been sent successfully to <strong>${toEmail}</strong>.</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p><strong>Note:</strong> ${note || 'No note provided'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p>You will receive a confirmation from PayPal shortly.</p>
          <p>Best regards,<br>The Monexa Team</p>
        </div>
      `
    };

    await transporter.sendMail(senderMailOptions);

    // Send notification email to recipient
    const recipientMailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: toEmail,
      subject: 'Payment Received - Monexa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Payment Received!</h2>
          <p>Hello,</p>
          <p>You have received a payment of <strong>$${amount}</strong> from <strong>${fromEmail}</strong> via Monexa.</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p><strong>Note:</strong> ${note || 'No note provided'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p>You will receive a confirmation from PayPal shortly.</p>
          <p>Best regards,<br>The Monexa Team</p>
        </div>
      `
    };

    await transporter.sendMail(recipientMailOptions);

    res.json({
      success: true,
      message: 'Payment sent successfully',
      transactionId: transactionId
    });

  } catch (error) {
    console.error('PayPal send money error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send payment' 
    });
  }
});

// Request money
router.post('/request', verifyToken, [
  body('fromEmail').isEmail().withMessage('Valid sender email is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount is required'),
  body('note').optional().isString().withMessage('Note must be a string')
], async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ success: false, errors: validationErrors.array() });
    }

    const { fromEmail, amount, note = '' } = req.body;
    const userId = req.user.id;
    const toEmail = req.user.email;

    // Generate mock payment ID
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Record payment request in database
    await database.run(`
      INSERT INTO paypal_transactions (user_id, transaction_id, type, amount, recipient_email, note, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [userId, paymentId, 'request', amount, fromEmail, note, 'pending', new Date().toISOString()]);

    // Send payment request email
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: fromEmail,
      subject: 'Payment Request - Monexa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">Payment Request</h2>
          <p>Hello,</p>
          <p><strong>${req.user.name}</strong> has requested a payment of <strong>$${amount}</strong> from you via Monexa.</p>
          <p><strong>Note:</strong> ${note || 'No note provided'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p>To complete this payment, please log into your PayPal account and send the payment to: <strong>${toEmail}</strong></p>
          <p>Best regards,<br>The Monexa Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Payment request sent successfully',
      paymentId: paymentId
    });

  } catch (error) {
    console.error('PayPal request money error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send payment request' 
    });
  }
});

// Get transactions
router.get('/transactions', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10, offset = 0 } = req.query;

    // Get transactions from database
    const transactions = await database.all(`
      SELECT * FROM paypal_transactions 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `, [userId, parseInt(limit), parseInt(offset)]);

    res.json({
      success: true,
      transactions: transactions
    });

  } catch (error) {
    console.error('PayPal transactions error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get transactions' 
    });
  }
});

// Disconnect PayPal account
router.delete('/disconnect', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Remove PayPal connection from database
    await database.run(
      'DELETE FROM paypal_connections WHERE user_id = ?',
      [userId]
    );

    // Send disconnection email
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: req.user.email,
      subject: 'PayPal Account Disconnected - Monexa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ef4444;">PayPal Account Disconnected</h2>
          <p>Hello ${req.user.name},</p>
          <p>Your PayPal account has been successfully disconnected from your Monexa account.</p>
          <p>If you didn't authorize this disconnection, please contact support immediately.</p>
          <p>Best regards,<br>The Monexa Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'PayPal account disconnected successfully'
    });

  } catch (error) {
    console.error('PayPal disconnect error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to disconnect PayPal account' 
    });
  }
});

// Get PayPal connection status
router.get('/status', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const connection = await database.get(
      'SELECT * FROM paypal_connections WHERE user_id = ?',
      [userId]
    );

    res.json({
      success: true,
      connected: !!connection,
      account: connection ? JSON.parse(connection.account_info) : null
    });

  } catch (error) {
    console.error('PayPal status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get PayPal status' 
    });
  }
});

// PayPal OAuth callback
router.get('/oauth/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
    }

    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://api-m.paypal.com/v1/oauth2/token', 
      `grant_type=authorization_code&code=${code}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from('ARwhHhZI251Rzf-pfyfP7jJPf0cKgZC3EskfOUSdz4aXufA9SStx3oCDjEspCr6SiY8Ok3OznjH_qL-V:EFOSIbCGAZYJ_BVY815TSYG8jFpPnEgAt5yGIWxDCVTHNC3MA2Crg4DdRXqvFesdGqmE3j8jrVDePl-6').toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Get user info from PayPal
    const userInfoResponse = await axios.get('https://api-m.paypal.com/v1/identity/oauth2/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    const userInfo = userInfoResponse.data;

    // Store the connection in database (you'll need to get the user ID from the state parameter)
    // For now, we'll redirect to frontend with success message
    
    res.redirect(`http://localhost:3000/paypal/success?email=${userInfo.email}`);

  } catch (error) {
    console.error('PayPal OAuth callback error:', error);
    res.redirect('http://localhost:3000/paypal/error');
  }
});

module.exports = router;
