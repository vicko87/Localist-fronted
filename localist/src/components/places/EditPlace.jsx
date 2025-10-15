import { useState } from 'react'
import { updatePlace } from '../../api/places';


 const EditPlace = ({place, onPlaceEdited}) => {
    const [formData, setFormData] = useState({
        name: place.name,
        category: place.category,
        address: place.address,
        notes: place.notes,
        image: null,
        coordinates: place.coordinates
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            image:file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append("category", formData.category);
      dataToSend.append("address", formData.address);
      dataToSend.append("notes", formData.notes);
      if (formData.image) dataToSend.append("image", formData.image);
      if (formData.coordinates) {
        dataToSend.append("lat", formData.coordinates.lat);
        dataToSend.append("lng", formData.coordinates.lng);
        }

        await updatePlace(place._id, dataToSend, token);
        alert('Place updated successfully');
        if (onPlaceEdited) onPlaceEdited();
    } catch (err) {
        alert(err.reponse?.data?.message || 'Error updating place');

    }
    }
  return (
<form onSubmit={handleSubmit}>
    <input 
    type="text" 
    name='name'
    value={formData.name}
    onChange={handleInputChange}
    placeholder='Place Name'
    />
     <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleImageUpload}
  />
      <button type="submit">Save changes</button>
</form>
  )
}
export default EditPlace;