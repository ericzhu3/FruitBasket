import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./home";
import { ShopContextProvider } from "./shop-context";
import { Cart } from "./cart";
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = (loggedIn, name) => {
    setIsLoggedIn(loggedIn);
    setUserName(name);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };
  

  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} userName={userName} />} />
            <Route
              exact
              path="/"
              element={<Home isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} userName={userName} />}
            />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
