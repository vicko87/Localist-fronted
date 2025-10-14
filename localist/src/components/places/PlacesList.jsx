import { useEffect, useState } from "react";
import { getPlaces } from "../../api/places";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then(res => setPlaces(res.data));
  }, []);

  return (
    <div>
      {places.map(place => (
        <div key={place._id}>
          <h3>{place.name}</h3>
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PlacesList;