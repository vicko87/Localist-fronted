
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import './Localist.css';

const Localist = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Navegar a AddPlace con la categoría pre-seleccionada
    navigate('/add-place', { state: { selectedCategory: category } });
  };

  return (
    <div className="localist-container">
      <div className="localist-header">
        <h1>Localist</h1>
      </div>

      <div className="add-button-section">
        <button 
          className="add-button"
          onClick={() => navigate('/add-place')} // Sin categoría pre-seleccionada
        >
          +
        </button>
      </div>

      <div className="categories-list">
        <div 
          className="category-item"
          onClick={() => handleCategoryClick('restaurant')}
        >
          <span>Restaurant</span>
          <span className="arrow">🍽️</span>
        </div>
        
        <div 
          className="category-item"
          onClick={() => handleCategoryClick('hotel')}
        >
          <span>Hotel</span>
          <span className="arrow">🏨</span>
        </div>
        
        <div 
          className="category-item"
          onClick={() => handleCategoryClick('store')}
        >
          <span>Store</span>
          <span className="arrow">🏪</span>
        </div>
        
        <div 
          className="category-item"
          onClick={() => handleCategoryClick('other')}
        >
          <span>Other</span>
          <span className="arrow">📍</span>
        </div>
      </div>

      
      <BottomNav />
    </div>
  );
};

export default Localist;

