import { useEffect, useState } from "react";
import API from "../api/api";

const Orders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState("");

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      alert("Failed to fetch cart");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      alert("Failed to fetch orders");
    }
  };

  const placeOrders = async () => {
    if (!address) return alert("Enter delivery address");

    try {
      for (let item of cartItems) {
        await API.post("/orders", {
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          size: item.size,
          address,
          imageUrl: item.imageUrl || "", // ✅ send image if exists
        });
        await API.delete(`/cart/${item._id}`);
      }
      alert("Order placed successfully");
      setAddress("");
      fetchOrders();
      setCartItems([]);
    } catch (err) {
      alert("Failed to place order");
    }
  };

  useEffect(() => {
    fetchCart();
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Place Order</h2>
      {cartItems.length === 0 ? (
        <p style={{ color: "gray" }}>Your cart is empty.</p>
      ) : (
        <>
          <textarea
            rows={3}
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <br />
          <button
            onClick={placeOrders}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </>
      )}

      <h2 style={{ marginTop: "40px" }}>📜 Your Orders</h2>
      {orders.length === 0 ? (
        <p style={{ color: "gray" }}>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              display: "flex",
              gap: "20px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#f8f9fa",
              alignItems: "center",
            }}
          >
            {order.imageUrl && (
              <img
                src={`http://localhost:5000${order.imageUrl}`}
                alt={order.productName}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
            <div>
              <h4 style={{ marginBottom: "8px" }}>{order.productName}</h4>
              <p><strong>Qty:</strong> {order.quantity}</p>
              <p><strong>Size:</strong> {order.size}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;