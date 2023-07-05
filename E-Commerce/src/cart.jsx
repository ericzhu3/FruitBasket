import React, { useContext } from "react";
import { ShopContext } from "./shop-context";
import { CartItem } from "./cart-item";
import {PRODUCTS} from "./product.js"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./cart.css";

export const Cart = ({ isLoggedIn, userName, handleSignOut }) => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <header className="header">
        <h1 className="store-name">E-Commerce</h1>
        <div className="btn">
          {isLoggedIn ? (
            <div>
                <p className="welcome-message">{`Welcome, ${userName}!`}</p>
                <button onClick={handleSignOut} className="signOut">Sign Out</button>
            </div>
          ) : (
            <>
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
            </>
          )}
          <Link to="/">
            <button id="home">
              <b>Home</b>
            </button>
          </Link>
        </div>
      </header>
      <div className="cartTitle">
        <h1>Your Shopping Cart</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button> CheckOut </button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
