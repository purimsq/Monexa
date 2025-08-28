const database = require('./config/database');

async function setupEmailTable() {
    try {
        console.log('Setting up emails table...');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS emails (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                recipient TEXT NOT NULL,
                subject TEXT NOT NULL,
                body TEXT NOT NULL,
                template TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'pending',
                sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                message_id TEXT,
                error_message TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        `;

        await database.run(createTableQuery);
        console.log('Emails table created successfully!');

        // Create index for better performance
        const createIndexQuery = `
            CREATE INDEX IF NOT EXISTS idx_emails_user_id ON emails (user_id);
            CREATE INDEX IF NOT EXISTS idx_emails_sent_at ON emails (sent_at);
        `;

        await database.run(createIndexQuery);
        console.log('Email indexes created successfully!');

    } catch (error) {
        console.error('Error setting up emails table:', error);
    } finally {
        database.close();
    }
}

setupEmailTable();
