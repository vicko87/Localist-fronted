
import { useLocation, useNavigate } from 'react-router-dom'
import './PlacePreview.css';

 const PlacePreview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const placeData = location.state?.placeData;

        // ✅ DEBUG: Agregar logs
    console.log('PlacePreview mounted');
    console.log('location.state:', location.state);
    console.log('placeData:', placeData);

    if(!placeData) {
        navigate('/add-place');
        return null;
    }

    const handleSave = () =>{
            // Guardar en localStorage
            const savedPlaces = JSON.parse(localStorage.getItem('places'))  || [];
            const newPlace = {
                id: Date.now(),
                ...placeData,
                createdAt: new Date().toISOString()
            };

            savedPlaces.push(newPlace);
            localStorage.setItem('places', JSON.stringify(savedPlaces));

               // Navegar a detalle final
               navigate('/place-detail', {
                state: {placeId: newPlace.id}
               });
    };
    const handleEdit = () => {
        navigate('/add-place', {
            state: {editData: placeData}
        })
    }
  return (
   <div className='preview-container'>
    <div className='preview-header'>
        <button className='back-button' onClick={handleEdit}>
             ←
        </button>
        <h2>Preview Place</h2>
    </div>

    <div className='preview-content'>
                {/* Imagen */}
     <div className='preview-image'>
        {placeData.image ? (
            <img src= {URL.createObjectURL(placeData.image)} alt="Place" />
          )  : (
                <div className='no-image'>📷 No image</div>
        )}
     </div>

      {/* Información */}
        <div className="preview-info">
          <h3>{placeData.name}</h3>
          <p className="category">{placeData.category}</p>
          <p className="address">{placeData.address}</p>
          {placeData.notes && (
            <p className="notes">{placeData.notes}</p>
          )}
                  </div>

         {/* Mapa pequeño */}
        {placeData.coordinates && (
          <div className="preview-map">
            <div className="map-placeholder">
              <span>📍</span>
              <p>Location selected</p>
            </div>
          </div>
        )}
      </div>

      <div className="preview-buttons">
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="confirm-button" onClick={handleSave}>
          Save Place
        </button>
    </div>

   </div>
  )
}

export default PlacePreview;