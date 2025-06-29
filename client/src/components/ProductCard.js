import React from "react";
import "./ProductCard.css";
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={styles.card}>
      {product.imageUrl && (
        <img
          src={`http://localhost:5000${product.imageUrl}`}
          alt={product.name}
          style={styles.image}
        />
      )}
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>₹{product.price}</p>
      {onAddToCart && (
        <button style={styles.button} onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "16px",
    width: "250px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    textAlign: "center",
    background: "#fff",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductCard;