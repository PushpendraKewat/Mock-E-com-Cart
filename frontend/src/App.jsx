import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // --- Fetch products ---
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  // --- Fetch cart ---
  const fetchCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart");
    const data = await res.json();
    setCart(data.cart);
    setTotal(data.total);
  };

  // --- Add to Cart ---
  const addToCart = async (productId) => {
    await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty: 1 }),
    });
    fetchCart();
  };

  // --- Remove from Cart ---
  const removeFromCart = async (id) => {
    await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
    fetchCart();
  };

  // --- Checkout ---
  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    const data = await res.json();
    setReceipt(data);
    setModalIsOpen(true);
    fetchCart();
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Vibe Commerce - Mock E-Com Cart</h1>

      {/* --- Products --- */}
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              width: "180px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* --- Cart --- */}
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name} (x{item.qty}) — ₹{item.price * item.qty}{" "}
              <button onClick={() => removeFromCart(item.id)}>❌</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}

      {/* --- Checkout Modal --- */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Receipt"
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          },
        }}
      >
        {receipt ? (
          <>
            <h2>🧾 Receipt</h2>
            <p><strong>Total:</strong> ₹{receipt.total}</p>
            <p><strong>Time:</strong> {receipt.timestamp}</p>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </>
        ) : (
          <p>Processing...</p>
        )}
      </Modal>
    </div>
  );
}

export default App;

