import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSignup.css";

import user from "../Assets/user.png";
import mail from "../Assets/mail.png";
import password from "../Assets/password.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !pass) {
      alert("Please fill in all fields");
      return;
    }
    console.log("📝 Registering:", { name, email, pass });
    alert("Registered successfully (demo)");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <form className="inputs" onSubmit={handleRegister}>
        <div className="input">
          <img src={user} alt="user" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={mail} alt="mail" />
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password} alt="password" />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
       <div  className="submit-container">
        <button type="submit" className="submit">
          Sign Up
        </button>
               </div>

      </form>

      <p style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;