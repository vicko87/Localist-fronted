import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import  AddPlace  from "./components/AddPlace";
import Login from "./components/Login";
import Register from "./components/Register";



function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/add-place" element={<AddPlace />} />
      </Routes>
    </Router>
  );
}

export default App;