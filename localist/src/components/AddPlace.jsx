import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './AddPlace.css';


  
const AddPlace = () => {
  const navigate = useNavigate(); 
const location = useLocation()
 // Obtener la categoría pre-seleccionada (si viene de Localist)
  const selectedCategory = location.state?.selectedCategory || '';
  // estado inicial del formulario usa la categoría recibida:
const [formData, setFormData] = useState({
  name: '',
  category: selectedCategory,  // ← Si clickeaste 'Hotel', aquí será 'hotel'
  notes: '',
  image: null
})
   // Si se actualiza la categoría desde fuera, actualizar el form
  useEffect(() => {
    if (selectedCategory) {
      setFormData(prev => ({
        ...prev,
        category: selectedCategory
      }));
    }
  }, [selectedCategory]);


const handleInputChange = (e) =>{
  const {name, value} = e.target;
  setFormData(prev => ({ 
    ...prev, 
    [name]: value 
  }))
}

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  setFormData(prev =>({
    ...prev,
    image: file
  }))
}

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Please enter a name for the place');
      return;
    }
    
    console.log('Form data:', formData);
    alert('Place saved successfully!');
    navigate('/localist');
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
 <div className="field-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}// ← Si viene de Hotel, mostrará 'hotel'
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