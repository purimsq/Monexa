#!/usr/bin/env node
/**
 * Monexa Backend Setup Script
 * Initializes the backend with database, sample data, and configuration
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

const setupSteps = [
    'Creating directories',
    'Installing dependencies', 
    'Initializing database',
    'Creating sample data',
    'Setting up environment',
    'Testing email service'
];

let currentStep = 0;

const logStep = (message) => {
    currentStep++;
    console.log(`\n[${currentStep}/${setupSteps.length}] ${message}...`);
};

const createDirectories = async () => {
    logStep('Creating directories');
    
    const directories = [
        'uploads',
        'uploads/temp',
        'exports',
        'logs',
        'database'
    ];

    for (const dir of directories) {
        const dirPath = path.join(__dirname, dir);
        try {
            await fs.access(dirPath);
            console.log(`  ✓ Directory exists: ${dir}`);
        } catch {
            await fs.mkdir(dirPath, { recursive: true });
            console.log(`  ✓ Created directory: ${dir}`);
        }
    }
};

const installDependencies = async () => {
    logStep('Installing dependencies');
    
    return new Promise((resolve, reject) => {
        const npm = spawn('npm', ['install'], { 
            cwd: __dirname,
            stdio: 'inherit'
        });

        npm.on('close', (code) => {
            if (code === 0) {
                console.log('  ✓ Dependencies installed successfully');
                resolve();
            } else {
                console.error('  ✗ Failed to install dependencies');
                reject(new Error('npm install failed'));
            }
        });
    });
};

const initializeDatabase = async () => {
    logStep('Initializing database');
    
    return new Promise((resolve, reject) => {
        const node = spawn('node', ['scripts/initDatabase.js'], { 
            cwd: __dirname,
            stdio: 'inherit'
        });

        node.on('close', (code) => {
            if (code === 0) {
                console.log('  ✓ Database initialized successfully');
                resolve();
            } else {
                console.error('  ✗ Failed to initialize database');
                reject(new Error('Database initialization failed'));
            }
        });
    });
};

const createSampleData = async () => {
    logStep('Creating sample data');
    
    // Create sample environment file
    const envContent = `# Monexa Backend Environment Configuration
PORT=5000
NODE_ENV=development
JWT_SECRET=monexa-development-secret-key-change-in-production-use-strong-256-bit-key
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
`;

    try {
        await fs.access(path.join(__dirname, '.env'));
        console.log('  ✓ .env file already exists');
    } catch {
        await fs.writeFile(path.join(__dirname, '.env'), envContent);
        console.log('  ✓ Created sample .env file');
    }

    // Create sample data script
    const sampleDataScript = `
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const database = require('./config/database');

async function createSampleData() {
    try {
        // Create sample user
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash('password123', 12);
        
        await database.run(
            \`INSERT OR IGNORE INTO users (id, name, email, password, role, avatar, bio) 
             VALUES (?, ?, ?, ?, ?, ?, ?)\`,
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
            \`INSERT OR IGNORE INTO user_settings (id, user_id) VALUES (?, ?)\`,
            [uuidv4(), userId]
        );

        console.log('✓ Sample data created successfully');
        console.log('  Demo User: demo@monexa.com');
        console.log('  Password: password123');
        
    } catch (error) {
        console.error('✗ Failed to create sample data:', error);
    }
}

createSampleData();
`;

    await fs.writeFile(path.join(__dirname, 'scripts', 'createSampleData.js'), sampleDataScript);
    
    return new Promise((resolve, reject) => {
        const node = spawn('node', ['scripts/createSampleData.js'], { 
            cwd: __dirname,
            stdio: 'inherit'
        });

        node.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                console.error('  ✗ Failed to create sample data');
                reject(new Error('Sample data creation failed'));
            }
        });
    });
};

const setupEnvironment = async () => {
    logStep('Setting up environment');
    
    // Create startup scripts
    const startScript = `#!/bin/bash
echo "🚀 Starting Monexa Backend Server..."
export NODE_ENV=development
node server.js
`;

    const devScript = `#!/bin/bash
echo "🔄 Starting Monexa Backend in Development Mode..."
export NODE_ENV=development
npx nodemon server.js
`;

    await fs.writeFile(path.join(__dirname, 'start.sh'), startScript);
    await fs.writeFile(path.join(__dirname, 'dev.sh'), devScript);
    
    console.log('  ✓ Created startup scripts');
    console.log('  ✓ Environment configured');
};

const testEmailService = async () => {
    logStep('Testing email service');
    
    return new Promise((resolve) => {
        const python = spawn('python', ['services/email_service.py', '--help'], { 
            cwd: __dirname,
            stdio: 'pipe'
        });

        python.on('close', (code) => {
            if (code === 0) {
                console.log('  ✓ Python email service is working');
            } else {
                console.log('  ⚠ Python email service test failed (this is optional)');
                console.log('    Make sure Python is installed for email functionality');
            }
            resolve();
        });
    });
};

const main = async () => {
    console.log('🎵 Monexa Backend Setup');
    console.log('========================\n');

    try {
        await createDirectories();
        await installDependencies();
        await initializeDatabase();
        await createSampleData();
        await setupEnvironment();
        await testEmailService();

        console.log('\n🎉 Setup completed successfully!');
        console.log('\nNext steps:');
        console.log('1. Update the .env file with your email credentials');
        console.log('2. Start the server: npm run dev');
        console.log('3. Test the API: http://localhost:5000/api/health');
        console.log('4. Login with demo@monexa.com / password123');
        
    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
        process.exit(1);
    }
};

// Run setup if called directly
if (require.main === module) {
    main();
}

module.exports = { main };
