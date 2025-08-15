/**
 * Email Configuration for Monexa
 * 
 * To set up email functionality, you need to configure the following environment variables:
 * 
 * For Gmail:
 * - EMAIL_ADDRESS=your_email@gmail.com
 * - EMAIL_PASSWORD=your_app_password (not your regular password)
 * - SMTP_SERVER=smtp.gmail.com (default)
 * - SMTP_PORT=587 (default)
 * 
 * For Outlook/Hotmail:
 * - EMAIL_ADDRESS=your_email@outlook.com
 * - EMAIL_PASSWORD=your_password
 * - SMTP_SERVER=smtp-mail.outlook.com
 * - SMTP_PORT=587
 * 
 * For Yahoo:
 * - EMAIL_ADDRESS=your_email@yahoo.com
 * - EMAIL_PASSWORD=your_app_password
 * - SMTP_SERVER=smtp.mail.yahoo.com
 * - SMTP_PORT=587
 * 
 * Frontend URL (for password reset links):
 * - FRONTEND_URL=http://localhost:3000 (for development)
 * - FRONTEND_URL=https://yourdomain.com (for production)
 */

module.exports = {
    // Email service configuration
    smtp: {
        server: process.env.SMTP_SERVER || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
    },
    
    // Email credentials
    auth: {
        user: process.env.EMAIL_ADDRESS || 'your_email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your_app_password',
    },
    
    // Frontend URL for links in emails
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    
    // Email templates configuration
    templates: {
        from: process.env.EMAIL_ADDRESS || 'your_email@gmail.com',
        fromName: 'Monexa Team',
    },
    
    // Check if email is properly configured
    isConfigured() {
        const email = process.env.EMAIL_ADDRESS;
        const password = process.env.EMAIL_PASSWORD;
        
        return email && 
               password && 
               email !== 'your_email@gmail.com' && 
               password !== 'your_app_password';
    },
    
    // Get configuration status
    getStatus() {
        return {
            configured: this.isConfigured(),
            smtpServer: this.smtp.server,
            smtpPort: this.smtp.port,
            emailAddress: this.auth.user,
            frontendUrl: this.frontendUrl
        };
    }
};
