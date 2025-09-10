import { useState } from "react";
import { Link,  useNavigate  } from "react-router-dom";
import "./LoginSignup.css";

import mail from "../Assets/mail.png";
import password from "../Assets/password.png";


const Login = () => {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !pass) {
      alert("Please fill in all fields");
      return;
    }
    console.log("🔐 Logging in:", { email, pass });
    alert("Login successful (demo)");
  navigate('/localist');
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <form className="inputs" onSubmit={handleLogin}>
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
          <div className="submit-container">
          <button type="submit" className="submit">
      Login
    </button>
  </div>
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      </form>

      <p style={{ textAlign: "center" }}>
        Don’t have an account? <Link to="/register">Sign Up</Link>
      </p>
      
    </div>
  );
};

export default Login;

