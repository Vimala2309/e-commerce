import "../components/ProductCard.css";
import { useEffect, useState } from "react";
import API from "../api/api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const payload = {
      productId: product._id,
      productName: product.name,
      quantity: 1,
      size: product.size?.[0] || "M",
    };
    try {
      await API.post("/cart", payload);
      alert("Product added to cart");
    } catch (err) {
      alert("Add to cart failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Available Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={user ? addToCart : null}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;