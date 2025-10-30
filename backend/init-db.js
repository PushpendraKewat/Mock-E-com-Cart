require('dotenv').config();
const { runAsync } = require('./db');

async function init() {
  try {
    // Create tables
    await runAsync(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY,
      productId INTEGER NOT NULL,
      qty INTEGER NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(productId) REFERENCES products(id)
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY,
      total REAL NOT NULL,
      payload TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )`);

    // Clear existing and insert sample products
    await runAsync(`DELETE FROM products`);
    const products = [
      ['Classic White Tee', 12.99, 'Soft cotton tee - unisex'],
      ['Blue Denim Jeans', 39.99, 'Slim fit denim pants'],
      ['Running Sneakers', 59.99, 'Lightweight running shoes'],
      ['Minimalist Watch', 89.99, 'Quartz watch with leather strap'],
      ['Canvas Backpack', 34.99, 'Durable 20L backpack'],
      ['Wireless Earbuds', 49.99, 'Bluetooth 5.0 earbuds'],
      ['Ceramic Mug', 9.99, '12oz coffee mug'],
      ['Baseball Cap', 14.99, 'Adjustable cap']
    ];
    for (const [name, price, desc] of products) {
      await runAsync(`INSERT INTO products (name, price, description) VALUES (?, ?, ?)`, [name, price, desc]);
    }

    console.log('Database initialized with sample products.');
    process.exit(0);
  } catch (err) {
    console.error('DB init error:', err);
    process.exit(1);
  }
}

init();
