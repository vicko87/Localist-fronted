import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './PlaceDetails.css'; 

export const PlaceDetails = () => {
     const navigate = useNavigate();
     const {id} = useParams();

     const [place, _setPlace] = useState(() => {
   const savedPlaces = JSON.parse(localStorage.getItem('places')) || [];
   return savedPlaces.find(p => p.id === parseInt(id)) || {
     id: 1,
     name: 'Sample Place',
     category: 'restaurant',
     address: 'Sample Address',
     notes: 'Sample notes about this place',
     image: null,
     coordinates: null
   };
});
     const handleEdit = () => {
        navigate(`/edit-place/${id}`, { state: { place } });
     };

     const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this place?')) {
          const savedPlaces = JSON.parse(localStorage.getItem('places')) || [];
          const updatedPlaces = savedPlaces.filter(p => p.id !== parseInt(id));
          localStorage.setItem('places', JSON.stringify(updatedPlaces));
          navigate('/localist');
        }
     };

  return (
   
    <div className="place-details-container">
        <div className="place-details-header">
            <button className="back-button" onClick={() => navigate('/localist')}>
                  ←
            </button>
            <h2>Place</h2>
        </div>
      <div className="place-details-content">
        {/* Imagen */}
        <div className="place-image-container">
          {place.image ? (
            <img 
              src={typeof place.image === 'string' ? place.image : URL.createObjectURL(place.image)} 
              alt={place.name}
              className="place-image"
            />
          ) : (
            <div className="place-image-placeholder">
              <div className="image-icon">🏞️</div>
            </div>
          )}
        </div>

        {/* Información del lugar */}
        <div className="place-info">
          <div className="place-name">
              <h3>{place.name}</h3>
          </div>

          <div className="place-location">
              <div className="location-icon">📍</div>
              <span>{place.address || 'No address provided'}</span>
          </div>

          {place.notes && (
            <div className="place-notes">
              <p>{place.notes}</p>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="action-buttons">
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceDetails;