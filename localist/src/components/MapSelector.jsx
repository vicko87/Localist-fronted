import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// para arreglar iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});



// Componente para manejar clicks en el mapa
function LocationMarker({ onLocationSelect,  coordinates }) {
  const [position, setPosition] = useState(null);
  
  useMapEvents({
    click(e) {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
        onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  // Mostrar marcador si hay coordenadas pasadas
  useEffect(() => {
    if (coordinates) {
      if (Array.isArray(coordinates)) {
        setPosition(coordinates);
      } else if (coordinates.lat && coordinates.lng) {
        setPosition([coordinates.lat, coordinates.lng]);
      }
    }
  }, [coordinates]);


  return position === null ? null : (
    <Marker position={position}>
      <Popup>Selected location</Popup>
    </Marker>
  );
}

// Componente interno del mapa que se monta/desmonta completamente
const MapComponent = ({ onLocationSelect,  coordinates }) => {
  const getMapCenter = () => {
    if (coordinates) {
      if (Array.isArray(coordinates)) {
        return coordinates;
      } else if (coordinates.lat && coordinates.lng) {
        return [coordinates.lat, coordinates.lng];
      }
    }
 return [40.4168, -3.7038]; // Madrid por defecto
  };


  return (
    <MapContainer 
     center={getMapCenter()}
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      key={`${getMapCenter()[0]}-${getMapCenter()[1]}`} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onLocationSelect={onLocationSelect}  coordinates={coordinates} />
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

  
  //  Formatear coordenadas para mostrar
  const formatCoordinates = () => {
    if (coordinates) {
      if (Array.isArray(coordinates)) {
        return `${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)}`;
      } else if (coordinates.lat && coordinates.lng) {
        return `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
      }
    }
    return null;
  };

  return (
    <div className="map-container">
       <div className="map-instructions">
           📍 Click on the map to select location
      </div>
 <div style={{ height: '250px', width: '100%' }}>
        {showMapComponent && (
          <MapComponent onLocationSelect={onLocationSelect} coordinates={coordinates} />
        )}
      </div>

      {coordinates && (
        <div className="coordinates-info">
          <small>
             📍 Selected: {formatCoordinates()}
          </small>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
