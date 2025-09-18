import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapDetail.css';

// ✅ Configurar iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ✅ Icono personalizado rojo
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const placeId = location.state?.placeId;
    const [place, setPlace] = useState(null);
    const [searchAddress, setSearchAddress] = useState('');
    const [mapCenter, setMapCenter] = useState([40.4168, -3.7038]); // ✅ Madrid por defecto
    const [searchCoords, setSearchCoords] = useState(null);

    // Función para simular geocoding (convertir dirección a coordenadas)
    const geocodeAddress = async (address) => {
        if (!address.trim()) {
            setSearchCoords(null);
            return;
        }

        try {
            // Usar API gratuita de geocoding
            const searchQuery = `${address}, España`;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
            );
            const data = await response.json();

        console.log('Geocoding result:', data); // ✅ Debug
            
            if (data && data.length > 0) {
                const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                 console.log('Found coordinates:', coords);
                setSearchCoords(coords);
                setMapCenter(coords);
            } else {
                // ✅ Si no encuentra, usar coordenadas simuladas
                 console.log('Address not found, using Madrid center');
                   const coords = [40.4168, -3.7038];
                setSearchCoords(coords);
                setMapCenter(coords);
            }
             
        } catch (error) {
            console.error('Geocoding error:', error);
            //Error fallback
            const coords = [40.4168, -3.7038];
            setSearchCoords(coords);
            setMapCenter(coords);
        
        }
    };

    const handleSearch = (address) => {
        setSearchAddress(address);
        geocodeAddress(address);
    };

    useEffect(() => {
        if (placeId) {
            const savedPlaces = JSON.parse(localStorage.getItem('places')) || [];
            const foundPlace = savedPlaces.find(p => p.id === placeId);
            setPlace(foundPlace);
            if (foundPlace) {
                setSearchAddress(foundPlace.address);
                geocodeAddress(foundPlace.address);
            }
        } else {
            navigate('/localist');
        }
    }, [placeId, navigate]);

    if (!place) {
        return (
            <div className="map-detail-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="map-detail-container">
            {/* Header */}
            <div className="map-header">
                <button className="back-button" onClick={() => navigate('/localist')}>
                    ←
                </button>
                <h2>Map</h2>
            </div>

            {/* Search bar */}
            <div className="search-container">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search address..."
                        className="search-input"
                        value={searchAddress}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

          {/* ✅ MAPA MÁS GRANDE */}
            <div className="map-area">
                <MapContainer 
                    center={mapCenter} 
                    zoom={13} // ✅ Zoom más cercano (era 15)
                    className="leaflet-map"
                    key={`${mapCenter[0]}-${mapCenter[1]}`}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* ✅ Marcador en la ubicación real */}
                    {searchCoords && (
                        <Marker position={searchCoords} icon={redIcon}>
                            <Popup>
                                <div>
                                    <strong>{place.name}</strong><br/>
                                    <em>{place.category}</em><br/>
                                    📍 {place.address} {/* ✅ Dirección real */}
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>

                {/* ✅ Info card más compacta */}
                <div className="place-info-overlay">
                    <div className="place-card">
                        <h3>{place.name}</h3>
                        <p className="place-category">{place.category}</p>
                        <p className="place-address">📍 {place.address}</p>
                        {searchAddress !== place.address && (
                            <p className="search-result">
                                🔍 Searching: {searchAddress}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom info bar */}
            <div className="bottom-info">
                <div className="location-info">
                    <span className="location-icon">📍</span>
                    <span className="location-text">
                        {place.address} {/* ✅ Siempre mostrar dirección real */}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MapDetail;