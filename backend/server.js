const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite
const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) console.error(err.message);
  else console.log("✅ Connected to SQLite database.");
});

// Mock products
const products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Jeans", price: 999 },
  { id: 3, name: "Shoes", price: 1499 },
  { id: 4, name: "Cap", price: 299 },
  { id: 5, name: "Watch", price: 1999 },
];

let cart = [];

// --- API routes ---
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
});

app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = cart.find((item) => item.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ ...product, qty });

  res.json({ message: "Added to cart", cart });
});

app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((item) => item.id !== id);
  res.json({ message: "Removed", cart });
});

app.post("/api/checkout", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const timestamp = new Date().toLocaleString();
  res.json({ total, timestamp });
  cart = [];
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));

