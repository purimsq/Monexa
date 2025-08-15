const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const database = require('./config/database');

async function createDemoUser() {
    try {
        console.log('Creating demo user...');
        
        // Hash password
        const hashedPassword = await bcrypt.hash('password123', 10);
        const userId = uuidv4();
        
        // Create user
        await database.run(
            `INSERT OR REPLACE INTO users (
                id, name, email, password, role, location, bio
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                'Demo User',
                'demo@monexa.com',
                hashedPassword,
                'Music Producer',
                'Dubai, UAE',
                'Professional music producer passionate about creating amazing music.'
            ]
        );
        
        console.log('✅ Demo user created successfully!');
        console.log('Email: demo@monexa.com');
        console.log('Password: password123');
        
        database.close();
    } catch (error) {
        console.error('Failed to create demo user:', error);
        database.close();
    }
}

createDemoUser();
