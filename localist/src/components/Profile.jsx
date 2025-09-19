import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './Profile.css';

export const Profile = () => {
  const navigate = useNavigate
  const [user, setUser] = useState({
    name:'',
    email:''
  })

  const [places, setPlaces] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
        // Cargar datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem('currentUser')) || {};
    setUser(userData);
    // Cargar lugares del usuario
    const allPlaces = JSON.parse(localStorage.getItem('places'))  || [];
    setPlaces(allPlaces)
  }, []);

  const handleSave = () => {
     // Guardar cambios en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsEditing(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }
  return (
    <div className="profile-container">
           {/* Header */}
           <div className="profile-header">
            <button className="back-buttom" onClick={() => navigate('/localist')}>
                 ←
            </button>
     <h2>Profile</h2>
     <button className="edit-button"
      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
     >
    {isEditing ? '💾' : '✏️'}
     </button>
           </div>
  {/* Profile Info */}
  <div className="profile-info">
      <div className="profile-image-section">
          <div className="profile-image">
            <div className="default-avatar">
              <span>👤</span>
            </div>
          </div>
  </div>

  <div className="user-details">
    <div className="detail-group">
        <label>Name</label>
        {isEditing ? (
            <input type="text" 
            value={user.name}
            onChange={(e) => setUser(prev => ({...prev, name: e.target.value}))}
                className="edit-input"
            />
        ) : (
            <p>{user.name || 'Not set'}</p>
        )}
    </div>

<div className="detail-group">
    <label>Email</label>
     {isEditing ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser(prev => ({...prev, email: e.target.value}))}
                className="edit-input"
              />
            ) : (
              <p>{user.email || 'Not set'}</p>
            )}
        </div>
      </div>
    </div>

      {/* Places Stats */}
      <div className="places-stats">
        <div className="stat-card">
            <span className="stat-number">{places.length}</span>
            <span className="stat-label">Places Saved</span>
        </div>
        <div className="stat-card">
            <span className="stat-number">{new Set(places.map(p => p.category)).size}</span>
            <span className="stat-label">Categories</span>
        </div>
      </div>

 {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-button" onClick={() => navigate('/localist')}>
          🗺️ My Places
        </button>
        <button className="action-button" onClick={() => navigate('/add-place')}>
          ➕ Add Place
        </button>
      </div>

      {/* Logout */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
