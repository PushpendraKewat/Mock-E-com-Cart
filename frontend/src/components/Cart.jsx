import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCart(data.cart || []); // fallback
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;

  if (!cart || cart.length === 0)
    return <p>Your cart is empty 🛒</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} (x{item.qty}) — ₹{item.price * item.qty}{" "}
          <button onClick={() => removeFromCart(item.id)}>❌</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
