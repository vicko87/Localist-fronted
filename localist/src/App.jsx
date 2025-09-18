import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import  AddPlace  from "./components/AddPlace";
import Login from "./components/Login";
import Localist from "./components/Localist";
import Register from "./components/Register";
import PlacePreview from "./components/PlacePreview";
import MapDetail from "./components/MapDetail";




function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/localist" element={<Localist />} />
        <Route path="/add-place" element={<AddPlace />} />
        <Route path="/place-preview" element={< PlacePreview/>} />
         <Route path="/map-detail" element={< MapDetail/>} />

      </Routes>

   
    </Router>
  );
}

export default App;