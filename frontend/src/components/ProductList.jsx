import React from "react";
import tshirt from "../assets/images/tshirt.webp";
import jeans from "../assets/images/jeans.webp";
import shoes from "../assets/images/shoes.webp";
import cap from "../assets/images/cap.webp";
import watch from "../assets/images/watch.webp";

const images = { 1: tshirt, 2: jeans, 3: shoes, 4: cap, 5: watch };

function ProductList({ products, addToCart }) {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "180px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <img
            src={images[p.id]}
            alt={p.name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;


