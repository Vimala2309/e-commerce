import { useEffect, useState } from "react";
import API from "../api/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
  });
  const [file, setFile] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
    }
  };

  const fetchAllOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      alert("Failed to fetch orders");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("size", newProduct.size);
    if (file) formData.append("image", file);

    try {
      await API.post("/products", formData);
      fetchAllProducts();
      setNewProduct({ name: "", description: "", price: "", size: "" });
      setFile(null);
    } catch (err) {
      alert("Failed to add product");
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllOrders();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>🛠 Admin Dashboard</h2>

      <h3 style={{ marginTop: "30px" }}>Add New Product</h3>
      <form
        onSubmit={handleAddProduct}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "40px",
          background: "#f7f7f7",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Size"
          value={newProduct.size}
          onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
          required
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          type="submit"
          style={{
            gridColumn: "span 2",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ➕ Add Product
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        {/* Products Column */}
        <div>
          <h3>📦 All Products</h3>
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "15px",
                padding: "15px",
                background: "#fff",
                boxShadow: "0 0 5px rgba(0,0,0,0.05)",
              }}
            >
              <strong>{p.name}</strong> — ₹{p.price}
              <p>{p.description}</p>
              {p.imageUrl && (
                <img
                  src={`http://localhost:5000${p.imageUrl}`}
                  alt={p.name}
                  style={{ width: "100%", maxWidth: "180px", borderRadius: "6px", marginTop: "10px" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Orders Column */}
        <div>
          <h3>📑 All Orders</h3>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((o) => (
              <div
                key={o._id}
                style={{
                  background: "#fafafa",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "15px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.05)",
                }}
              >
                <strong>{o.productName}</strong> — Qty: {o.quantity} | Size: {o.size}
                <p>
                  <strong>User:</strong> {o.userId?.username} ({o.userId?.email})
                </p>
                <p><strong>Address:</strong> {o.address}</p>
                <p><strong>Date:</strong> {new Date(o.orderDate).toLocaleString()}</p>
                <p><strong>Status:</strong> {o.status}</p>
                {o.imageUrl && (
                  <img
                    src={`http://localhost:5000${o.imageUrl}`}
                    alt={o.productName}
                    style={{ width: "100%", maxWidth: "150px", borderRadius: "6px", marginTop: "10px" }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;