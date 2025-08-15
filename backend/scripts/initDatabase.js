const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Database file path
const dbPath = path.join(dbDir, 'monexa.db');

// Read schema file
const schemaPath = path.join(dbDir, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Initialize database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Execute schema
db.exec(schema, (err) => {
    if (err) {
        console.error('Error creating schema:', err);
        process.exit(1);
    }
    console.log('Database schema created successfully');
    
    // Close database connection
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
            console.log('✅ Database initialized successfully!');
        }
    });
});
