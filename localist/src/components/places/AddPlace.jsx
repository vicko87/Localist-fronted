import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MapSelector from '../map/MapSelector';
import { createPlace } from "../../api/places";
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
    coordinates: null  // coordenadas del mapa
  })

  // Estados para geocodificación
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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

  //Función para buscar direcciones
  const searchAddress = async (query) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      // Usando OpenStreetMap Nominatim (gratuito)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();

      const suggestions = data.map(item => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        address: item.display_name
      }));

      setAddressSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching address:', error);
      setAddressSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.address) {
        searchAddress(formData.address);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.address]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Manejar selección de sugerencia
  const handleSuggestionSelect = (suggestion) => {
    console.log('Selected suggestion:', suggestion);
    setFormData(prev => ({
      ...prev,
      address: suggestion.address,
      coordinates: { lat: suggestion.lat, lng: suggestion.lon }
    }));
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  // Manejar selección de ubicación en el mapa
  const handleLocationSelect = async (coordinates) => {
    setFormData(prev => ({
      ...prev,
      coordinates: coordinates
    }));

    //Geocodificación reversa para obtener dirección
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.display_name) {
        setFormData(prev => ({
          ...prev,
          address: data.display_name,
          coordinates: coordinates
        }));
      }
    } catch (error) {
      console.error('Error getting address from coordinates:', error);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Please enter a name for the place');
      return;
    }
    // Si usas autenticación, obtén el token del localStorage
    try {
      const token = localStorage.getItem('token');
      // paraq imagen, FormData para enviar archivos
      const dataToSend = new FormData();
      dataToSend.append('name', formData.name);
      dataToSend.append('category', formData.category);
      dataToSend.append("address", formData.address);
      dataToSend.append("notes", formData.notes);
      if (formData.image) dataToSend.append('image', formData.image);
      if (formData.coordinates) {
        dataToSend.append('lat', formData.coordinates.lat);
        dataToSend.append('lng', formData.coordinates.lng);
      }

      await createPlace(dataToSend, token);

      alert('Place added successfully');
      navigate('/localist');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding place');

    }
  }

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
              <div className="address-search-wrapper">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className="form-input"
                  onFocus={() => formData.address && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {isSearching && (
                  <div className="search-indicator">🔍</div>
                )}


                {showSuggestions && addressSuggestions.length > 0 && (
                  <div className="address-suggestions">
                    {addressSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        <div className="suggestion-text">
                          {suggestion.display_name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="map-button"
                onClick={toggleMap}
              >
                🗺️ {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>

            {/*  Mostrar coordenadas si están disponibles */}
            {formData.coordinates && (
              <div className="coordinates-display">
                📍 Coordinates: {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
              </div>
            )}

            {/* MAPA - Renderizado completamente condicional */}
            {showMap && (
              <MapSelector
                onLocationSelect={handleLocationSelect}
                coordinates={formData.coordinates}
                isVisible={showMap}
              />
            )}
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