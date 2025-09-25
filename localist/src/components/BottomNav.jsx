import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <button
        className={`nav-item ${isActive('/map-main') ? 'active' : ''}`}
        onClick={() => navigate('/map-main')}
      >
        <div className="nav-icon">🏠</div>
        <span className="nav-label">Home</span>
      </button>

      <button
        className={`nav-item center-button ${isActive('/add-place') ? 'active' : ''}`}
        onClick={() => navigate('/add-place')}
      >
        <div className="nav-icon-center">➕</div>
        <span className="nav-label">Add</span>
      </button>

      <button
        className={`nav-item ${isActive('/localist') ? 'active' : ''}`}
        onClick={() => navigate('/localist')}
      >
        <div className="nav-icon">📍</div>
        <span className="nav-label">Places</span>
      </button>

      <button
        className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        onClick={() => navigate('/profile')}
      >
        <div className="nav-icon">👤</div>
        <span className="nav-label">Profile</span>
      </button>
    </div>
  );
};

export default BottomNav;