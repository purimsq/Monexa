#!/usr/bin/env python3
"""
Monexa Email Service
Python service for sending emails (free using SMTP)
"""

import smtplib
import ssl
import os
import sys
import json
import argparse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        # Email configuration (using Gmail SMTP)
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.email_address = os.getenv('EMAIL_ADDRESS', 'your_email@gmail.com')
        self.email_password = os.getenv('EMAIL_PASSWORD', 'your_app_password')
        self.sender_name = 'Monexa'
        
        # Validate configuration
        if self.email_address == 'your_email@gmail.com':
            logger.warning("Email service not configured. Please set EMAIL_ADDRESS and EMAIL_PASSWORD environment variables.")

    def send_export_email(self, to_email, user_name, export_type, file_path=None):
        """Send export completion email"""
        try:
            # Create message
            message = MIMEMultipart()
            message["From"] = f"{self.sender_name} <{self.email_address}>"
            message["To"] = to_email
            message["Subject"] = f"Monexa Data Export - {export_type.title()}"

            # Email body
            body = f"""
            Dear {user_name},

            Your data export is ready! We've successfully generated your {export_type} export from Monexa.

            Export Details:
            - Type: {export_type.title()}
            - Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            - Status: Completed

            {f'Please find your exported data attached to this email.' if file_path else 'Your data has been processed and is available in your account.'}

            If you have any questions or need assistance, please don't hesitate to contact our support team.

            Best regards,
            The Monexa Team

            ---
            This is an automated email from Monexa.
            """

            message.attach(MIMEText(body, "plain"))

            # Attach file if provided
            if file_path and os.path.exists(file_path):
                try:
                    with open(file_path, "rb") as attachment:
                        part = MIMEBase('application', 'octet-stream')
                        part.set_payload(attachment.read())

                    encoders.encode_base64(part)
                    
                    filename = os.path.basename(file_path)
                    part.add_header(
                        'Content-Disposition',
                        f'attachment; filename= {filename}'
                    )
                    
                    message.attach(part)
                    logger.info(f"Attached file: {filename}")
                    
                except Exception as e:
                    logger.error(f"Failed to attach file {file_path}: {e}")

            # Send email
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.email_address, self.email_password)
                
                text = message.as_string()
                server.sendmail(self.email_address, to_email, text)
                
            logger.info(f"Export email sent successfully to {to_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send export email: {e}")
            return False

    def send_notification_email(self, to_email, user_name, subject, message_body):
        """Send general notification email"""
        try:
            # Create message
            message = MIMEMultipart()
            message["From"] = f"{self.sender_name} <{self.email_address}>"
            message["To"] = to_email
            message["Subject"] = f"Monexa - {subject}"

            # Email body
            body = f"""
            Dear {user_name},

            {message_body}

            Best regards,
            The Monexa Team

            ---
            This is an automated email from Monexa.
            """

            message.attach(MIMEText(body, "plain"))

            # Send email
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.email_address, self.email_password)
                
                text = message.as_string()
                server.sendmail(self.email_address, to_email, text)
                
            logger.info(f"Notification email sent successfully to {to_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send notification email: {e}")
            return False

    def send_welcome_email(self, to_email, user_name):
        """Send welcome email for new users"""
        subject = "Welcome to Monexa!"
        
        message_body = f"""Welcome to Monexa!

        Dear {user_name},

        We're excited to have you join our community of music creators and producers.

        Your account has been successfully created and you can now:
        • Manage your music production finances
        • Track your beats and sales
        • Organize your payment methods
        • Export your financial data
        • Connect with other producers

        Get started by exploring your dashboard and setting up your profile.

        If you need any help getting started, our support team is here to assist you.

        Best regards,
        The Monexa Team
        """

        return self.send_notification_email(to_email, user_name, subject, message_body)

    def send_transaction_alert(self, to_email, user_name, transaction_details):
        """Send transaction alert email"""
        subject = f"Transaction Alert - {transaction_details.get('type', 'Unknown').title()}"
        
        amount = transaction_details.get('amount', 0)
        currency = transaction_details.get('currency', 'USD')
        title = transaction_details.get('title', 'Transaction')
        status = transaction_details.get('status', 'completed')
        
        message_body = f"""Dear {user_name},

        A new transaction has been processed on your account:

        Transaction Details:
        • Title: {title}
        • Type: {transaction_details.get('type', 'Unknown').title()}
        • Amount: {currency} {amount}
        • Status: {status.title()}
        • Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

        You can view more details in your Monexa dashboard under Transaction History.

        If you did not authorize this transaction, please contact support immediately.

        Best regards,
        The Monexa Team
        """

        return self.send_notification_email(to_email, user_name, subject, message_body)

def main():
    """Command line interface for email service"""
    parser = argparse.ArgumentParser(description='Monexa Email Service')
    parser.add_argument('--type', required=True, choices=['export', 'notification', 'welcome', 'transaction'], help='Email type')
    parser.add_argument('--to', required=True, help='Recipient email address')
    parser.add_argument('--name', required=True, help='Recipient name')
    parser.add_argument('--subject', help='Email subject (for notification type)')
    parser.add_argument('--message', help='Email message (for notification type)')
    parser.add_argument('--export-type', help='Export type (for export emails)')
    parser.add_argument('--file-path', help='File path for attachment (for export emails)')
    parser.add_argument('--transaction-data', help='Transaction data as JSON string (for transaction alerts)')

    args = parser.parse_args()

    # Initialize email service
    email_service = EmailService()

    success = False

    try:
        if args.type == 'export':
            if not args.export_type:
                logger.error("Export type is required for export emails")
                sys.exit(1)
            success = email_service.send_export_email(
                args.to, args.name, args.export_type, args.file_path
            )

        elif args.type == 'notification':
            if not args.subject or not args.message:
                logger.error("Subject and message are required for notification emails")
                sys.exit(1)
            success = email_service.send_notification_email(
                args.to, args.name, args.subject, args.message
            )

        elif args.type == 'welcome':
            success = email_service.send_welcome_email(args.to, args.name)

        elif args.type == 'transaction':
            if not args.transaction_data:
                logger.error("Transaction data is required for transaction alert emails")
                sys.exit(1)
            
            try:
                transaction_details = json.loads(args.transaction_data)
            except json.JSONDecodeError:
                logger.error("Invalid JSON in transaction data")
                sys.exit(1)
                
            success = email_service.send_transaction_alert(
                args.to, args.name, transaction_details
            )

        if success:
            logger.info("Email sent successfully")
            sys.exit(0)
        else:
            logger.error("Failed to send email")
            sys.exit(1)

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
