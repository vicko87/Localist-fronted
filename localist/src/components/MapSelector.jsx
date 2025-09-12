import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Arreglar iconos de marcador (problema común con Leaflet + React)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// Componente para manejar clicks en el mapa
function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  
  useMapEvents({
    click(e) {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
      onLocationSelect(newPosition);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Selected location</Popup>
    </Marker>
  );
}

// Componente interno del mapa que se monta/desmonta completamente
const MapComponent = ({ onLocationSelect }) => {
  return (
    <MapContainer 
      center={[40.4168, -3.7038]} // Madrid por defecto
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

const MapSelector = ({ onLocationSelect, coordinates, isVisible }) => {
  const [showMapComponent, setShowMapComponent] = useState(false);
  const timeoutRef = useRef(null);

  // Efecto para manejar el delay en mostrar/ocultar el mapa
  useEffect(() => {
    if (isVisible) {
      // Pequeño delay para asegurar que el DOM esté limpio
      timeoutRef.current = setTimeout(() => {
        setShowMapComponent(true);
      }, 50);
    } else {
      // Ocultar inmediatamente
      setShowMapComponent(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="map-container">
      <div style={{ height: '200px', width: '100%' }}>
        {showMapComponent && (
          <MapComponent onLocationSelect={onLocationSelect} />
        )}
      </div>
      
      {coordinates && (
        <div className="coordinates-info">
          <small>
            📍 Selected: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
          </small>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
