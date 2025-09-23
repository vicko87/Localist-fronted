import { useState } from "react";
import { Link,  useNavigate  } from "react-router-dom";
import "./LoginSignup.css";

import mail from "../Assets/mail.png";
import password from "../Assets/password.png";


const Login = () => {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (email && pass) {
        // Guardar usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: email.split('@')[0] // Usar parte del email como nombre por defecto
        }));
        
        console.log('Login successful');
        navigate('/map-main'); 
    } else {
        alert('Please fill in all fields');
    }
};

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <form className="inputs" onSubmit={handleSubmit}>
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

