import { useEffect, useState } from "react";
import { getPlaces, deletePlace } from "../../api/places";
import EditPlace from "./EditPlace";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [editingPlace, setEditingPlace] = useState(null);

  useEffect(() => {
    getPlaces().then(res => setPlaces(res.data));
  }, []);

  const handlePlaceEdited = () => {
    setEditingPlace(null);
    getPlaces().then(res => setPlaces(res.data)); // Actualizar la lista
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      const token = localStorage.getItem('token');
      await deletePlace(id, token);
      setPlaces(places.filter(place => place.id !== id));
    }
  }

  return (
    <div>
      {editingPlace ? (
        <EditPlace place={editingPlace} onPlaceEdited={handlePlaceEdited} />
      ) : (
        places.map(place => (
          <div key={place._id}>
            <h3>{place.name}</h3>
            <p>{place.description}</p>
            <button onClick={() => setEditingPlace(place)}>Edit</button>
            <button onClick={() => handleDelete(place._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PlacesList;