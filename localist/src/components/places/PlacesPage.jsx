import { useState } from "react";
import AddPlace from "./AddPlace";
import PlacesList from "./PlacesList";


const PlacesPage = () => {
const [refresh, setRefresh] = useState(false);

const handlePlaceAdded = ()  => setRefresh(r  => !r);

return (
    <div>
        <AddPlace onPlaceAdded={handlePlaceAdded} />
        <PlacesList key={refresh} />
    </div>
);
};

export default PlacesPage;