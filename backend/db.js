// backend/db.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/ecom.db", (err) => {
  if (err) console.error("❌ Database connection failed:", err.message);
  else console.log("✅ Connected to SQLite database.");
});

// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    qty INTEGER,
    FOREIGN KEY(productId) REFERENCES products(id)
  )`);
});

module.exports = db;
