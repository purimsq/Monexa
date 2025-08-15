const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');

async function createSampleData() {
    try {
        console.log('Creating sample data...');

        // Create sample user
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash('password123', 12);
        
        await database.run(
            `INSERT OR IGNORE INTO users (id, name, email, password, role, avatar, bio) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId, 
                'Demo User', 
                'demo@monexa.com', 
                hashedPassword,
                'Music Producer',
                'DU',
                'Professional music producer passionate about creating amazing music.'
            ]
        );

        // Create sample user settings
        await database.run(
            `INSERT OR IGNORE INTO user_settings (id, user_id) VALUES (?, ?)`,
            [uuidv4(), userId]
        );

        // Create sample cards
        const cardIds = [uuidv4(), uuidv4()];
        
        await database.run(
            `INSERT OR IGNORE INTO cards (
                id, user_id, type, number, holder_name, 
                expiry_month, expiry_year, cvv, is_default
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                cardIds[0], userId, 'Visa', '4532123456781234', 'Demo User',
                12, 2026, '123', 1
            ]
        );

        await database.run(
            `INSERT OR IGNORE INTO cards (
                id, user_id, type, number, holder_name, 
                expiry_month, expiry_year, cvv, is_default
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                cardIds[1], userId, 'Mastercard', '5425789012345678', 'Demo User',
                8, 2025, '456', 0
            ]
        );

        // Create sample transactions
        const transactionIds = [uuidv4(), uuidv4(), uuidv4()];
        
        await database.run(
            `INSERT OR IGNORE INTO transactions (
                id, user_id, type, category, title, description,
                amount, currency, status, reference, card_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                transactionIds[0], userId, 'income', 'beat_sale', 'Beat Sale - Midnight Vibes',
                'Sold exclusive beat to artist', 150.00, 'USD', 'completed', 'TXN-001', cardIds[0]
            ]
        );

        await database.run(
            `INSERT OR IGNORE INTO transactions (
                id, user_id, type, category, title, description,
                amount, currency, status, reference, card_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                transactionIds[1], userId, 'income', 'licensing', 'Music Licensing Fee',
                'Licensing agreement for commercial use', 500.00, 'USD', 'completed', 'TXN-002', null
            ]
        );

        await database.run(
            `INSERT OR IGNORE INTO transactions (
                id, user_id, type, category, title, description,
                amount, currency, status, reference, card_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                transactionIds[2], userId, 'expense', 'equipment', 'Studio Equipment',
                'New microphone for recording', 299.99, 'USD', 'completed', 'TXN-003', cardIds[1]
            ]
        );

        // Create sample beneficiary
        await database.run(
            `INSERT OR IGNORE INTO beneficiaries (
                id, user_id, name, email, phone, account_number, 
                bank_name, relationship
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                uuidv4(), userId, 'John Smith', 'john@example.com', '+1-555-0123',
                '1234567890', 'Demo Bank', 'Collaborator'
            ]
        );

        // Create sample notification
        await database.run(
            `INSERT OR IGNORE INTO notifications (
                id, user_id, title, message, type, category
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                uuidv4(), userId, 'Welcome to Monexa!', 
                'Your account has been set up successfully. Start managing your music finances today!',
                'success', 'system'
            ]
        );

        console.log('✓ Sample data created successfully');
        console.log('');
        console.log('Demo User Credentials:');
        console.log('  Email: demo@monexa.com');
        console.log('  Password: password123');
        console.log('');
        console.log('Sample data includes:');
        console.log('  - 2 Credit cards');
        console.log('  - 3 Transactions');
        console.log('  - 1 Beneficiary');
        console.log('  - 1 Welcome notification');
        
    } catch (error) {
        console.error('✗ Failed to create sample data:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    createSampleData().then(() => {
        process.exit(0);
    });
}

module.exports = { createSampleData };
