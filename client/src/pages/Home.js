import React from "react";
import "./Home.css";

const Home = () => {
  const backgroundStyle = {
    backgroundImage: "url('/assets/home-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white",
  };

  return (
    <div className="home-container" style={backgroundStyle}>
      <div className="home-hero">
        <h1>Welcome to the E-Commerce App</h1>
        <p>Browse our products and place your order easily.</p>
        <a href="/products" className="home-btn">Shop Now</a>
      </div>
    </div>
  );
};

export default Home;