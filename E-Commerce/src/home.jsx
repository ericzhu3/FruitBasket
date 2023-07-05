import React, {useState} from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "./product.js";
import { Product } from "./product.jsx";
import { ShoppingCart } from "phosphor-react";
import "./home.css";

export const Home = ({ isLoggedIn, userName, handleSignOut }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredProducts = PRODUCTS.filter((product) => {
        const productName = product.name || "";
        return productName.toLowerCase().includes(searchValue.toLowerCase());
    });

  return (
    <body>
      <header class="header">
        <h1 className="store-name">E-Commerce</h1>
        <input type="search" placeholder="search" id="searchbar" value={searchValue}
          onChange={handleSearchChange}></input>
        {isLoggedIn ? (
          <div className="btn">
            <p className="welcome-message">{`Welcome, ${userName}!`}</p>
            <button onClick={handleSignOut} className="signOut">Sign Out</button>
            <Link to="/cart">
              <ShoppingCart id="cart" size={32} />
            </Link>
          </div>
        ) : (
          <div className="btn">
            <Link to="/login">
              <button className="home-btn" id="home-login">
                <b>Login</b>
              </button>
            </Link>
            <Link to="/register">
              <button className="home-btn" id="home-register">
                <b>Sign Up</b>
              </button>
            </Link>
            <Link to="/cart">
              <ShoppingCart id="cart" size={32} />
            </Link>
          </div>
        )}
      </header>
      <div className="products">
      {PRODUCTS.filter((product) =>
          product.productName.toLowerCase().includes(searchValue.toLowerCase())
        ).map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </body>
  );
};
