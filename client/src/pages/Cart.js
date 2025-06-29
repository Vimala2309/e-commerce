import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Cart.css"; // ✅ Make sure you create this file

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      alert("Failed to fetch cart items");
    }
  };

  const removeFromCart = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      alert("Item removed from cart");
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-card">
              {item.imageUrl && (
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.productName}
                  className="cart-image"
                />
              )}
              <div className="cart-info">
                <h4>{item.productName}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;