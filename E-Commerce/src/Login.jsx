import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Link, useNavigate } from "react-router-dom";
import userPools from "./userPools";

const ParentComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (isLoggedIn, email) => {
    setIsLoggedIn(isLoggedIn);
    setUserEmail(email);
  };

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome, {userEmail}</h1>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default ParentComponent;
export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [pass, setPassInvalid] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPools,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
        props.onLogin(true, email);
        setPassInvalid(false);
        setTimeout(() => {
          navigate("/");
        }, 100);
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
        setPassInvalid(true);
        props.onLogin(false, null);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
        props.onLogin(false, null);
        setPassInvalid(true);
      },
    });
  };

  return (
    <div className="auth-form">
      <h2 className="shopTitle">E-Commerce</h2>
      <form className="login" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="email">Email: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password: </label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        {pass && (
          <p className="error-message">Password Incorrect. Please try again.</p>
        )}
        <button id="login" type="submit" onClick={handleLogin}>
          Log In
        </button>
      </form>

      <Link to="/Register" className="link-btn">
        Don't have an account? Register here.
      </Link>
    </div>
  );
};
