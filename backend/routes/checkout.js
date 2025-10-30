// backend/routes/checkout.js
const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Invalid cartItems" });
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const timestamp = new Date().toISOString();

  // Clear cart after checkout
  db.run("DELETE FROM cart", [], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ total, timestamp, message: "Checkout successful" });
  });
});

module.exports = router;

