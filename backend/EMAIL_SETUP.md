# Email Setup Guide for Monexa

This guide will help you configure email functionality for your Monexa application.

## 🚀 Quick Setup

### 1. Create Environment File

Create a `.env` file in the `backend` directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_PATH=./database/monexa.db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
JWT_EXPIRES_IN=30d

# Email Configuration (Choose one provider below)

# For Gmail (Recommended):
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# For Outlook/Hotmail:
# EMAIL_ADDRESS=your_email@outlook.com
# EMAIL_PASSWORD=your_password
# SMTP_SERVER=smtp-mail.outlook.com
# SMTP_PORT=587

# For Yahoo:
# EMAIL_ADDRESS=your_email@yahoo.com
# EMAIL_PASSWORD=your_app_password
# SMTP_SERVER=smtp.mail.yahoo.com
# SMTP_PORT=587

# Frontend URL (for password reset links)
FRONTEND_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Security Configuration
SESSION_TIMEOUT=30
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=5
```

## 📧 Gmail Setup (Recommended)

### Step 1: Enable 2-Step Verification
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. In Security settings, find "App passwords"
2. Click "Generate" for a new app password
3. Select "Mail" as the app type
4. Copy the generated 16-character password
5. Use this password in your `.env` file as `EMAIL_PASSWORD`

### Step 3: Update Environment File
```env
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

## 🔧 Testing Email Configuration

### Method 1: Check Status
Check if email is properly configured:

```bash
curl http://localhost:5000/api/email/status
```

### Method 2: Test with User Registration
The best way to test email functionality is to register a new user account. The system will automatically send a welcome email to the email address provided during registration.

### Method 3: Test with Transactions
Create a new transaction in the app to trigger a transaction alert email.

### Method 4: Test with Data Export
Request a data export to receive an export completion email.

## 📋 Email Features

Once configured, the following email features will be available:

### ✅ Welcome Emails
- Sent automatically when new users register
- Includes welcome message and getting started guide

### ✅ Transaction Alerts
- Sent when new transactions are created
- Includes transaction details and amount

### ✅ Export Notifications
- Sent when data exports are completed
- Includes download links for exported files

### ✅ Password Reset
- Secure password reset functionality
- Time-limited reset tokens (1 hour expiry)

### ✅ General Notifications
- Custom notification emails
- System alerts and updates

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Authentication failed" error
- **Solution**: Make sure you're using an App Password, not your regular password
- **For Gmail**: Generate a new App Password in Google Account settings

#### 2. "Connection timeout" error
- **Solution**: Check your firewall settings
- **Solution**: Verify SMTP server and port are correct

#### 3. "Python not found" error
- **Solution**: Make sure Python is installed and in your PATH
- **Solution**: Test with `python --version` in terminal

#### 4. "Email not sending" but no errors
- **Solution**: Check spam/junk folder
- **Solution**: Verify email address is correct
- **Solution**: Check email provider's sending limits

### Debug Mode

To enable detailed logging, add this to your `.env` file:
```env
DEBUG=email:*
```

## 🔒 Security Notes

1. **Never commit your `.env` file** to version control
2. **Use App Passwords** instead of regular passwords
3. **Keep your JWT_SECRET** secure and random
4. **Regularly rotate** your email passwords
5. **Monitor** your email sending limits

## 📞 Support

If you're still having issues:

1. Check the server logs for detailed error messages
2. Verify your email provider's SMTP settings
3. Test with a different email provider
4. Ensure Python and all dependencies are installed

## 🎯 Next Steps

After setting up email:

1. **Create a `.env` file** in the backend directory with your email configuration
2. **Register a new user account** - you'll receive a welcome email from Monexa
3. **Create a transaction** - you'll receive a transaction alert email
4. **Request a data export** - you'll receive an export completion email
5. **Test password reset** - you'll receive a reset link email

### Important Notes:
- **All emails are sent from "Monexa"** as the sender name
- **Emails use the user's current profile email** (updates when profile is changed)
- **No test emails** - all emails are real and sent to actual users
- **Email addresses are always fetched from the database** to ensure they're current

Your Monexa application now has complete email functionality! 🎉
