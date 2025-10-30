import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = async (product) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, qty: 1 }),
    });
    const data = await res.json();
    fetchCart();
  };

  const fetchCart = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data.items);
    setTotal(data.total);
  };

  const removeItem = async (id) => {
    await fetch(`/api/cart/${id}`, { method: "DELETE" });
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, fetchCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
