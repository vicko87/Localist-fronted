import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapMain.css';
import BottomNav from '../common/BottomNav';
import { getPlaces } from "../../api/places";

// CONFIGURACIÓN SIMPLE DE ICONOS (SIN IMPORTS)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Iconos por categoría con URLs directas
const categoryIcons = {
    restaurant: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    hotel: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    store: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    other: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
};

const MapMain = () => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [mapCenter, setMapCenter] = useState([41.3851, 2.1734]);
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState(null);

    // useEffect(() => {
    //     try {
    //         console.log('🔄 Loading places...');
    //         setIsLoading(true);

    //         let savedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    //         // 2. Si no hay datos, crear ejemplos
    //         if (savedPlaces.length === 0) {
    //             console.log('✨ Creating sample data...');

    //             savedPlaces = [
    //                 {
    //                     id: 1,
    //                     name: "Sagrada Familia",
    //                     address: "Carrer de Mallorca, Barcelona",
    //                     category: "other",
    //                     coordinates: { lat: 41.4036, lng: 2.1744 }
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Park Güell",
    //                     address: "Carrer d'Olot, Barcelona",
    //                     category: "other",
    //                     coordinates: { lat: 41.4145, lng: 2.1527 }
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Restaurante La Pepica",
    //                     address: "Passeig de Neptú, 6, Valencia",
    //                     category: "restaurant",
    //                     coordinates: { lat: 39.4699, lng: -0.3763 }
    //                 },
    //                 {
    //                     id: 4,
    //                     name: "Hotel Arts Barcelona",
    //                     address: "Carrer de la Marina, 19, Barcelona",
    //                     category: "hotel",
    //                     coordinates: { lat: 41.3851, lng: 2.1965 }
    //                 },
    //                 {
    //                     id: 5,
    //                     name: "Mercado de San Miguel",
    //                     address: "Plaza de San Miguel, Madrid",
    //                     category: "store",
    //                     coordinates: { lat: 40.4156, lng: -3.7075 }
    //                 }
    //             ];
    //             localStorage.setItem('places', JSON.stringify(savedPlaces));
    //         }

    //         console.log('📍 Places loaded:', savedPlaces);
    //         // 3. Actualizar estados
    //         setPlaces(savedPlaces);
    //         setFilteredPlaces(savedPlaces);

    //         // Validar coordenadas antes de usar
    //         if (savedPlaces.length > 0 && savedPlaces[0].coordinates &&
    //             typeof savedPlaces[0].coordinates.lat === 'number' &&
    //             typeof savedPlaces[0].coordinates.lng === 'number') {
    //             setMapCenter([savedPlaces[0].coordinates.lat, savedPlaces[0].coordinates.lng]);
    //             console.log('🎯 Map center set:', savedPlaces[0].coordinates);
    //         }

    //         setIsLoading(false);
    //     } catch (err) {
    //         console.error('❌ Error loading places:', err);
    //         setError(err.message);
    //         setIsLoading(false);
    //     }
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        getPlaces(token).then(res => {
            const apiPlaces = res.data;
            const places = apiPlaces.map(place => ({
                id: place._id,
                name: place.name,
                address: place.location,
                description: place.description || '',
                category: place.category || 'other',
                coordinates: place.coordinates || { lat: 0, lng: 0 },
                createdBy: place.createdBy
            }));

            if (places.length > 0) {
                setMapCenter([places[0].coordinates.lat, places[0].coordinates.lng]);
                setPlaces(places);
                setFilteredPlaces(places);
            }
            setIsLoading(false);
        });
    }, []);


    useEffect(() => {
        try {
            let filtered = places;

            if (selectedCategory !== 'all') {
                filtered = filtered.filter(place => place.category === selectedCategory);
            }

            if (searchTerm) {
                filtered = filtered.filter(place =>
                    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    place.address.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredPlaces(filtered);
        } catch (err) {
            console.error('❌ Error filtering places:', err);
        }
    }, [places, selectedCategory, searchTerm]);

    const handleMarkerClick = (place) => {
        try {
            navigate('/map-detail', { state: { placeId: place.id } });
        } catch (err) {
            console.error('❌ Navigation error:', err);
        }
    };

    const getCategoryStats = () => {
        try {
            return {
                all: places.length,
                restaurant: places.filter(p => p.category === 'restaurant').length,
                hotel: places.filter(p => p.category === 'hotel').length,
                store: places.filter(p => p.category === 'store').length,
                other: places.filter(p => p.category === 'other').length
            };
        } catch (err) {
            console.error('❌ Stats error:', err);
            return { all: 0, restaurant: 0, hotel: 0, store: 0, other: 0 };
        }
    };

    const stats = getCategoryStats();

    // MOSTRAR PANTALLA DE CARGA
    if (isLoading) {
        return (
            <div className='map-main-container'>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white',
                    fontSize: '1.2rem'
                }}>
                    🔄 Loading map...
                </div>
            </div>
        );
    }

    // MOSTRAR PANTALLA DE ERROR
    if (error) {
        return (
            <div className='map-main-container'>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <h2>❌ Error loading map</h2>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: 'white',
                            color: '#2A00B7',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        🔄 Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='map-main-container'>
            <div className='map-main-header'>
                <div className='header-top'>
                    <div className='app-logo'>
                        <h2 className='app-title'>Localist</h2>
                    </div>
                </div>


                <div className='search-section'>
                    <div className='search-bar'>
                        <span className='search-icon'>🔍</span>
                        <input
                            type="text"
                            placeholder='Search places...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='search-input'
                        />
                    </div>
                </div>

                <div className='category-filters'>
                    <button
                        className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        <span className='filter-icon'>🌍</span>
                        <span>All ({stats.all})</span>
                    </button>

                    <button
                        className={`filter-btn ${selectedCategory === 'restaurant' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('restaurant')}
                    >
                        <span className='filter-icon'>🍽️</span>
                        <span>Restaurants ({stats.restaurant})</span>
                    </button>

                    <button
                        className={`filter-btn ${selectedCategory === 'hotel' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('hotel')}
                    >
                        <span className="filter-icon">🏨</span>
                        <span>Hotels ({stats.hotel})</span>
                    </button>

                    <button
                        className={`filter-btn ${selectedCategory === 'store' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('store')}
                    >
                        <span className="filter-icon">🏪</span>
                        <span>Stores ({stats.store})</span>
                    </button>

                    <button
                        className={`filter-btn ${selectedCategory === 'other' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('other')}
                    >
                        <span className="filter-icon">📍</span>
                        <span>Other ({stats.other})</span>
                    </button>
                </div>
            </div>

            <div className="map-main-area">
                {/* VALIDAR que tenemos coordenadas válidas */}
                {mapCenter && mapCenter.length === 2 && (
                    <MapContainer
                        center={mapCenter}
                        zoom={12}
                        className="leaflet-map-main"
                        key={`${mapCenter[0]}-${mapCenter[1]}`} // ✅ Forzar re-render si cambian coordenadas
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {filteredPlaces.map((place) => {
                            //Validar cada lugar antes de renderizar
                            if (!place || !place.coordinates ||
                                typeof place.coordinates.lat !== 'number' ||
                                typeof place.coordinates.lng !== 'number') {
                                console.warn('⚠️ Invalid place:', place);
                                return null;
                            }

                            const position = [place.coordinates.lat, place.coordinates.lng];
                            const icon = categoryIcons[place.category] || categoryIcons.other;

                            return (
                                <Marker
                                    key={place.id}
                                    position={position}
                                    icon={icon}
                                >
                                    <Popup>
                                        <div className="popup-content">
                                            <h4>{place.name}</h4>
                                            <p className="popup-category">{place.category}</p>
                                            <p className="popup-address">📍 {place.address}</p>
                                            <button
                                                className="popup-button"
                                                onClick={() => handleMarkerClick(place)}
                                            >
                                                View Details →
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                )}

                <div className="results-info">
                    <span>Showing {filteredPlaces.length} of {places.length} places</span>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default MapMain;