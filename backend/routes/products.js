// backend/routes/products.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../db");
const router = express.Router();

const productsFile = path.join(__dirname, "../data/products.json");

// Seed products (only once)
fs.readFile(productsFile, "utf8", (err, data) => {
  if (!err) {
    const products = JSON.parse(data);
    products.forEach((p) => {
      db.run(
        "INSERT OR IGNORE INTO products (id, name, price) VALUES (?, ?, ?)",
        [p.id, p.name, p.price]
      );
    });
  }
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;

