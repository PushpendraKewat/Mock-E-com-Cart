// backend/routes/cart.js
const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all cart items + total
router.get("/", (req, res) => {
  const sql = `
    SELECT c.id, p.name, p.price, c.qty
    FROM cart c
    JOIN products p ON c.productId = p.id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = rows.reduce((sum, item) => sum + item.price * item.qty, 0);
    res.json({ items: rows, total });
  });
});

// Add to cart
router.post("/", (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty)
    return res.status(400).json({ error: "Missing productId or qty" });

  db.run(
    "INSERT INTO cart (productId, qty) VALUES (?, ?)",
    [productId, qty],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, productId, qty });
    }
  );
});

// Delete item from cart
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM cart WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Item removed" });
  });
});

module.exports = router;

