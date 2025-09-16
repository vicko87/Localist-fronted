import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MapSelector from './MapSelector';
import './AddPlace.css';

const AddPlace = () => {
  const navigate = useNavigate(); 
  const location = useLocation()
  
  // Obtener la categoría pre-seleccionada (si viene de Localist)
  const selectedCategory = location.state?.selectedCategory || '';
  
  // estado inicial del formulario usa la categoría recibida:
  const [formData, setFormData] = useState({
    name: '',
    category: selectedCategory,
    address: '',
    notes: '',
    image: null,
    coordinates: null  // ← NUEVO: coordenadas del mapa
  })
  
  // Estado para mostrar/ocultar mapa
  const [showMap, setShowMap] = useState(false);

  // Si se actualiza la categoría desde fuera, actualizar el form
  useEffect(() => {
    if (selectedCategory) {
      setFormData(prev => ({
        ...prev,
        category: selectedCategory
      }));
    }
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  // Manejar selección de ubicación en el mapa
  const handleLocationSelect = (coordinates) => {
    setFormData(prev => ({
      ...prev,
      coordinates: coordinates
    }));
    
    // Opcionalmente, obtener dirección desde coordenadas (geocoding reverso)
    console.log('Coordinates selected:', coordinates);
  };

  // Función para toggle del mapa con reset
  const toggleMap = () => {
    if (showMap) {
      // Si estamos ocultando el mapa, resetear coordenadas
      setFormData(prev => ({
        ...prev,
        coordinates: null
      }));
    }
    setShowMap(!showMap);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Please enter a name for the place');
      return;
    }
    
      navigate('/place-preview', { 
    state: { placeData: formData } 
  });
};



  return (
    <div className="addplace-container">
      <div className="addplace-header">
        <button className="back-button"
          onClick={() => navigate('/localist')} 
        >←
        </button>
        <h2>Add Place</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="addplace-form">
        <div className="image-upload-section">
          <div className="image-placeholder">
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} alt="Preview" />
            ) : (
              <div className="placeholder-content">
                <div className="image-icon">📷</div>
                <p>Tap to add photo</p>
              </div>
            )}
          </div>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden-input"
          />
          <label htmlFor="image-upload" className="upload-label"></label>
        </div>
        
        <div className="form-fields">
          {/* CAMPO NAME */}
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="form-input"
            />
          </div>

          {/* CAMPO CATEGORY */}
          <div className="field-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Category</option>
              <option value="restaurant">Restaurant</option>
              <option value="cafe">Café</option>
              <option value="hotel">Hotel</option>
              <option value="store">Store</option>   
              <option value="shop">Shop</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* CAMPO ADDRESS */}
          <div className="field-group">
            <label htmlFor="address">Address</label>
            <div className="address-input-container">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                className="form-input"
              />
              <button 
                type="button"
                className="map-button"
                onClick={toggleMap}
              >
                🗺️ {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
            
            {/* MAPA - Renderizado completamente condicional */}
            <MapSelector 
              onLocationSelect={handleLocationSelect}
              coordinates={formData.coordinates}
              isVisible={showMap}
            />
          </div>

          {/* CAMPO NOTES */}
          <div className="field-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Notes"
              className="form-textarea"
              rows="4"
            />
          </div>
        </div>

        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    </div>
  )
}

export default AddPlace;