import { useState } from "react";
import { Link,  useNavigate  } from "react-router-dom";
import { login } from "../../api/auth";

import "./LoginSignup.css";

import mail from "../../Assets/mail.png";
import password from "../../Assets/password.png";


const Login = () => {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
   const res = await login({ email, password: pass });
      // Guarda el token si lo necesitas: localStorage.setItem('token', res.data.token);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      alert("Login exitoso");
      navigate('/localist');
    } catch (err) {
      alert(err.response?.data?.message || "Error al iniciar sesión");
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

