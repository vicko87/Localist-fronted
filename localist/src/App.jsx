import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import  AddPlace  from "./components/places/AddPlace";
import Login from "./components/auth/Login";
import Localist from "./components/places/Localist";
import Register from "./components/auth/Register";
import PlacePreview from "./components/places/PlacePreview";
import MapDetail from "./components/map/MapDetail";
import Profile from "./components/auth/Profile";
import MapMain from "./components/map/MapMain";
import PlacesList from "./components/places/PlacesList"; 




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
           <Route path="/places-list" element={<PlacesList />} /> 
      </Routes>

   
    </Router>
  );
}

export default App;