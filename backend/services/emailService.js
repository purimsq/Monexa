const { spawn } = require('child_process');
const path = require('path');

class EmailService {
    constructor() {
        this.pythonScript = path.join(__dirname, 'email_service.py');
    }

    /**
     * Send welcome email to new users
     */
    async sendWelcomeEmail(userEmail, userName) {
        return this._callPythonService('welcome', {
            to: userEmail,
            name: userName
        });
    }

    /**
     * Get user's current email from database
     */
    async getUserEmail(userId) {
        const database = require('../config/database');
        try {
            const user = await database.get(
                'SELECT email FROM users WHERE id = ?',
                [userId]
            );
            return user ? user.email : null;
        } catch (error) {
            console.error('Error getting user email:', error);
            return null;
        }
    }

    /**
     * Send transaction alert email
     */
    async sendTransactionAlert(userEmail, userName, transactionDetails) {
        return this._callPythonService('transaction', {
            to: userEmail,
            name: userName,
            transactionData: JSON.stringify(transactionDetails)
        });
    }

    /**
     * Send export completion email
     */
    async sendExportEmail(userEmail, userName, exportType, filePath = null) {
        console.log(`EmailService: Sending export email to ${userEmail} for ${userName}, type: ${exportType}`);
        console.log(`EmailService: File path: ${filePath}`);
        
        const args = {
            to: userEmail,
            name: userName,
            exportType: exportType
        };

        if (filePath) {
            args.filePath = filePath;
        }

        const result = await this._callPythonService('export', args);
        console.log(`EmailService: Export email result: ${result}`);
        return result;
    }

    /**
     * Send general notification email
     */
    async sendNotificationEmail(userEmail, userName, subject, message) {
        return this._callPythonService('notification', {
            to: userEmail,
            name: userName,
            subject: subject,
            message: message
        });
    }

    /**
     * Send email with beat attachment
     */
    async sendBeatEmail(userEmail, userName, subject, message, attachmentData = null) {
        // For large attachments, use a temporary file approach
        if (attachmentData && attachmentData.content && attachmentData.content.length > 10000) {
            return this._callPythonServiceWithTempFile('beat', {
                to: userEmail,
                name: userName,
                subject: subject,
                message: message,
                attachmentData: attachmentData
            });
        } else {
            return this._callPythonService('beat', {
                to: userEmail,
                name: userName,
                subject: subject,
                message: message,
                attachmentData: attachmentData ? JSON.stringify(attachmentData) : null
            });
        }
    }

    /**
     * Send password reset email
     */
    async sendPasswordResetEmail(userEmail, userName, resetToken) {
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
        
        const subject = 'Password Reset Request - Monexa';
        const message = `Hello ${userName},

You have requested to reset your password for your Monexa account.

To reset your password, please click on the following link:
${resetUrl}

This link will expire in 1 hour for security reasons.

If you did not request this password reset, please ignore this email and your password will remain unchanged.

Best regards,
The Monexa Team`;

        return this.sendNotificationEmail(userEmail, userName, subject, message);
    }

    /**
     * Send account verification email
     */
    async sendVerificationEmail(userEmail, userName, verificationToken) {
        const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
        
        const subject = 'Verify Your Email - Monexa';
        const message = `Hello ${userName},

Welcome to Monexa! Please verify your email address by clicking on the following link:
${verifyUrl}

This link will expire in 24 hours.

If you did not create an account with Monexa, please ignore this email.

Best regards,
The Monexa Team`;

        return this.sendNotificationEmail(userEmail, userName, subject, message);
    }

    /**
     * Generic method to call Python email service
     */
    async _callPythonService(type, args) {
        return new Promise((resolve, reject) => {
            const pythonArgs = [
                this.pythonScript,
                '--type', type,
                '--to', args.to,
                '--name', args.name
            ];

            // Add type-specific arguments
            switch (type) {
                case 'export':
                    pythonArgs.push('--export-type', args.exportType);
                    if (args.filePath) {
                        pythonArgs.push('--file-path', args.filePath);
                    }
                    break;
                case 'notification':
                    pythonArgs.push('--subject', args.subject);
                    pythonArgs.push('--message', args.message);
                    break;
                case 'beat':
                    pythonArgs.push('--subject', args.subject);
                    pythonArgs.push('--message', args.message);
                    if (args.attachmentData) {
                        pythonArgs.push('--attachment-data', args.attachmentData);
                    }
                    break;
                case 'transaction':
                    pythonArgs.push('--transaction-data', args.transactionData);
                    break;
            }

            const pythonProcess = spawn('python', pythonArgs, {
                env: { ...process.env }
            });

            let output = '';
            let errorOutput = '';

            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            pythonProcess.on('close', (code) => {
                console.log(`Python process exited with code: ${code}`);
                console.log(`Python stdout: ${output.trim()}`);
                console.log(`Python stderr: ${errorOutput.trim()}`);
                
                if (code === 0) {
                    console.log(`Email sent successfully (${type}):`, output.trim());
                    resolve(true);
                } else {
                    console.error(`Failed to send email (${type}):`, errorOutput.trim());
                    resolve(false); // Don't reject, just log the error
                }
            });

            pythonProcess.on('error', (error) => {
                console.error(`Python process error (${type}):`, error);
                resolve(false);
            });
        });
    }

    /**
     * Call Python service with temporary file for large attachments
     */
    async _callPythonServiceWithTempFile(type, args) {
        const fs = require('fs');
        const path = require('path');
        const os = require('os');

        return new Promise(async (resolve, reject) => {
            let tempFile = null;
            
            try {
                // Create temporary file for attachment data
                if (args.attachmentData) {
                    tempFile = path.join(os.tmpdir(), `monexa_attachment_${Date.now()}.json`);
                    fs.writeFileSync(tempFile, JSON.stringify(args.attachmentData));
                }

                const pythonArgs = [
                    this.pythonScript,
                    '--type', type,
                    '--to', args.to,
                    '--name', args.name
                ];

                // Add type-specific arguments
                switch (type) {
                    case 'beat':
                        pythonArgs.push('--subject', args.subject);
                        pythonArgs.push('--message', args.message);
                        if (tempFile) {
                            pythonArgs.push('--attachment-file', tempFile);
                        }
                        break;
                }

                const pythonProcess = spawn('python', pythonArgs, {
                    env: { ...process.env }
                });

                let output = '';
                let errorOutput = '';

                pythonProcess.stdout.on('data', (data) => {
                    output += data.toString();
                });

                pythonProcess.stderr.on('data', (data) => {
                    errorOutput += data.toString();
                });

                pythonProcess.on('close', (code) => {
                    // Clean up temporary file
                    if (tempFile && fs.existsSync(tempFile)) {
                        try {
                            fs.unlinkSync(tempFile);
                        } catch (err) {
                            console.warn('Failed to clean up temp file:', err);
                        }
                    }

                    console.log(`Python process exited with code: ${code}`);
                    console.log(`Python stdout: ${output.trim()}`);
                    console.log(`Python stderr: ${errorOutput.trim()}`);
                    
                    if (code === 0) {
                        console.log(`Email sent successfully (${type}):`, output.trim());
                        resolve(true);
                    } else {
                        console.error(`Failed to send email (${type}):`, errorOutput.trim());
                        resolve(false);
                    }
                });

                pythonProcess.on('error', (error) => {
                    // Clean up temporary file on error
                    if (tempFile && fs.existsSync(tempFile)) {
                        try {
                            fs.unlinkSync(tempFile);
                        } catch (err) {
                            console.warn('Failed to clean up temp file:', err);
                        }
                    }

                    console.error(`Python process error (${type}):`, error);
                    resolve(false);
                });

            } catch (error) {
                // Clean up temporary file on error
                if (tempFile && fs.existsSync(tempFile)) {
                    try {
                        fs.unlinkSync(tempFile);
                    } catch (err) {
                        console.warn('Failed to clean up temp file:', err);
                    }
                }

                console.error(`Error in _callPythonServiceWithTempFile (${type}):`, error);
                resolve(false);
            }
        });
    }

    /**
     * Check if email service is properly configured
     */
    async checkConfiguration() {
        return new Promise((resolve) => {
            const pythonProcess = spawn('python', [this.pythonScript, '--help'], {
                env: { ...process.env }
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Email service is properly configured');
                    resolve(true);
                } else {
                    console.warn('⚠️ Email service may not be properly configured');
                    resolve(false);
                }
            });

            pythonProcess.on('error', (error) => {
                console.error('❌ Email service configuration error:', error);
                resolve(false);
            });
        });
    }
}

module.exports = new EmailService();
