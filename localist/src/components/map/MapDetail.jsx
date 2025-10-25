import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNav from '../common/BottomNav';
import './MapDetail.css';
import { getPlaces } from "../../api/places";

const MapDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const placeId = location.state?.placeId;
    const [place, setPlace] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (placeId) {
            const token = localStorage.getItem('token');
            getPlaces(token).then(res => {
                console.log(placeId)
                const foundPlace = res.data.find(p => p._id === placeId);
                setPlace(foundPlace);
            });
        } else {
            navigate('/map-main');
        }
    }, [placeId, navigate]);

    const getCategoryIcon = (category) => {
        const icons = {
            'restaurant': '🍽️',
            'historical': '🏛️',
            'nature': '🏞️',
            'entertainment': '🎭',
            'museum': '🏛️',
            'park': '🌳',
            'beach': '🏖️',
            'mountain': '⛰️',
            'shopping': '🛍️',
            'cafe': '☕',
            'bar': '🍺',
            'hotel': '🏨',
            'default': '📍'
        };
        return icons[category?.toLowerCase()] || icons.default;
    };

    const openInMap = () => {
        if (place?.coordinates?.lat && place?.coordinates?.lng) {
            window.open(`https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}`, '_blank');
        }
    };

    const handleEdit = () => {
        navigate('/edit-place', { state: { placeId: place._id } });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this place?')) {
            // Implementar lógica de eliminación
            console.log('Delete place:', place._id);
        }
    };

    if (!place) {
        return (
            <div className="map-detail-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading place details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="map-detail-container">
            {/* Header con navegación */}
            <div className="map-detail-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <h2>Place Details</h2>
                <div className="header-spacer"></div>
            </div>

            <div className="map-detail-content">
                {/* Hero Image */}
                <div className="hero-image-container">
                    {place.imageUrl && !imageError ? (
                        <img 
                            src={place.imageUrl} 
                            alt={place.name}
                            className="hero-image"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="hero-placeholder">
                            <span className="placeholder-icon">{getCategoryIcon(place.category)}</span>
                        </div>
                    )}
                    <div className="hero-overlay">
                        <h1 className="place-name">{place.name}</h1>
                    </div>
                </div>

                {/* Category Badge */}
                {place.category && (
                    <div className="category-badge">
                        <span className="category-icon">{getCategoryIcon(place.category)}</span>
                        <span className="category-text">{place.category}</span>
                    </div>
                )}

                {/* Location Card */}
                {place.location && (
                    <div className="info-card location-card">
                        <div className="card-header">
                            <span className="card-icon">📍</span>
                            <h3>Location</h3>
                        </div>
                        <p className="location-address">{place.location}</p>
                        {place.coordinates?.lat && place.coordinates?.lng && (
                            <button className="view-map-button" onClick={openInMap}>
                                View on Map 🗺️
                            </button>
                        )}
                    </div>
                )}

                {/* Description Card */}
                {place.description && (
                    <div className="info-card description-card">
                        <div className="card-header">
                            <span className="card-icon">📝</span>
                            <h3>Description</h3>
                        </div>
                        <p className="description-text">{place.description}</p>
                    </div>
                )}

                {/* Personal Notes Card */}
                {place.notes && (
                    <div className="info-card notes-card">
                        <div className="card-header">
                            <span className="card-icon">📒</span>
                            <h3>Personal Notes</h3>
                        </div>
                        <p className="notes-text">{place.notes}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="action-button edit-button" onClick={handleEdit}>
                        ✏️ Edit Place
                    </button>
                    <button className="action-button delete-button" onClick={handleDelete}>
                        🗑️ Delete
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default MapDetail;