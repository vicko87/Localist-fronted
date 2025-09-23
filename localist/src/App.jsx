import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import  AddPlace  from "./components/AddPlace";
import Login from "./components/Login";
import Localist from "./components/Localist";
import Register from "./components/Register";
import PlacePreview from "./components/PlacePreview";
import MapDetail from "./components/MapDetail";
import Profile from "./components/Profile";
import MapMain from "./components/MapMain";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

         <Route path="/map-main" element={<MapMain />} />
        <Route path="/localist" element={<Localist />} />

        <Route path="/add-place" element={<AddPlace />} />
        <Route path="/place-preview" element={< PlacePreview/>} />
         <Route path="/map-detail" element={< MapDetail/>} />
          <Route path="/profile" element={< Profile/>} /> 
      </Routes>

   
    </Router>
  );
}

export default App;