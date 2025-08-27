const database = require('./config/database');

async function setupPayPalTables() {
  try {
    console.log('Setting up PayPal database tables...');

    // Create PayPal connections table
    await database.run(`
      CREATE TABLE IF NOT EXISTS paypal_connections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        paypal_email TEXT NOT NULL,
        account_info TEXT,
        connected_at TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // Create PayPal transactions table
    await database.run(`
      CREATE TABLE IF NOT EXISTS paypal_transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        transaction_id TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('send', 'receive', 'request')),
        amount DECIMAL(10,2) NOT NULL,
        recipient_email TEXT,
        note TEXT,
        status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // Create indexes for better performance
    await database.run(`
      CREATE INDEX IF NOT EXISTS idx_paypal_connections_user_id 
      ON paypal_connections (user_id)
    `);

    await database.run(`
      CREATE INDEX IF NOT EXISTS idx_paypal_transactions_user_id 
      ON paypal_transactions (user_id)
    `);

    await database.run(`
      CREATE INDEX IF NOT EXISTS idx_paypal_transactions_created_at 
      ON paypal_transactions (created_at)
    `);

    console.log('✅ PayPal database tables created successfully!');
    
    // Test the tables
    const connections = await database.all('SELECT name FROM sqlite_master WHERE type="table" AND name LIKE "paypal_%"');
    console.log('📊 PayPal tables found:', connections.map(t => t.name));

  } catch (error) {
    console.error('❌ Error setting up PayPal tables:', error);
    throw error;
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupPayPalTables()
    .then(() => {
      console.log('🎉 PayPal database setup completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 PayPal database setup failed:', error);
      process.exit(1);
    });
}

module.exports = setupPayPalTables;
