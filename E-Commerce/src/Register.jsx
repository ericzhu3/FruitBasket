import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userPools from "./userPools";

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [firstName, setFirst] = useState("");
    const [secondName, setSecond] = useState("");
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [signupSuccessful, setSignupSuccessful] = useState(false);
    const navigate = useNavigate();
    

    const submit = (event) => {
        event.preventDefault();

        userPools.signUp(email, password, [], null, (err, data) => {
            if (err) {
            console.error(err);
            setInvalidPassword(true);
            } else {
                console.log(data);
                setSignupSuccessful(true);
                setTimeout(() => {
                    navigate('/Login');
                }, 2000);
                setInvalidPassword(false);
            }
        });
    };

    return (
        <div className="auth-form">
        <form className="register" onSubmit={submit}>
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
            <Link to="/">
            <button id="login-home">
              <b>Home</b>
            </button>
            </Link>
            <ul className="requirement">
            <li>Password needs to be at least 8 characters long</li>
            <li>Password must contain at least one uppercase letter</li>
            <li>Password must contain at least one number</li>
            <li>Password must contain at least one special character</li>
            </ul>
            {invalidPassword && (
            <p className="error-message">Invalid password. Please try again.</p>
            )}
            {signupSuccessful ? (
            <>
                <p className="success-message">Signup successful!</p>
                <p>Redirecting to login page...</p>
            </>
            ) : (
            <button id="register" type="submit">Sign Up</button>
            )}
        </form>
        <Link to="/Login" className="link-btn">
            Already have an account? Log in here.
        </Link>
        </div>
    );
};
