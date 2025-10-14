import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import "./LoginSignup.css";

import user from "../../Assets/user.png";
import mail from "../../Assets/mail.png";
import password from "../../Assets/password.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  
  const handleRegister = async(e) => {
    e.preventDefault();
    if (!name || !email || !pass) {
      alert("Please fill in all fields");
      return;
    }
    try {
   await register({
      username: name,
      email: email,
      password: pass,
    });
    
    alert("Registered successfully");
      navigate('/localist'); 
  }catch (err) {
    alert(err.response?.data?.message || "Error registering");
  }
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