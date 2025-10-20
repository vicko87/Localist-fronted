// Mock data para demo sin backend
export const mockPlaces = [
  {
    _id: '1',
    name: 'Sagrada Familia',
    description: 'Iconic basilica designed by Antoni Gaudí, known for its unique architecture.',
    location: 'Carrer de Mallorca, 401, Barcelona, Spain',
    category: 'historical',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    coordinates: { lat: 41.4036, lng: 2.1744 },
    notes: 'Visit during sunset for amazing photos!',
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    _id: '2',
    name: 'La Pepica',
    description: 'Traditional Valencian restaurant famous for authentic paella.',
    location: 'Passeig de Neptú, 6, Valencia, Spain',
    category: 'restaurant',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    coordinates: { lat: 39.4699, lng: -0.3763 },
    notes: 'Try the seafood paella - the best in Valencia!',
    createdAt: '2025-02-20T14:30:00Z'
  },
  {
    _id: '3',
    name: 'Hotel Arts Barcelona',
    description: 'Luxury beachfront hotel with stunning views of the Mediterranean.',
    location: 'Carrer de la Marina, 19-21, Barcelona, Spain',
    category: 'hotel',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    coordinates: { lat: 41.3851, lng: 2.1965 },
    notes: 'Great rooftop bar with panoramic city views',
    createdAt: '2025-03-10T09:15:00Z'
  },
  {
    _id: '4',
    name: 'Mercado de San Miguel',
    description: 'Historic covered market offering gourmet tapas and Spanish delicacies.',
    location: 'Plaza de San Miguel, Madrid, Spain',
    category: 'store',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    coordinates: { lat: 40.4156, lng: -3.7075 },
    notes: 'Perfect for trying different Spanish wines and tapas',
    createdAt: '2025-04-05T16:45:00Z'
  },
  {
    _id: '5',
    name: 'Park Güell',
    description: 'Public park system with colorful mosaics designed by Antoni Gaudí.',
    location: 'Carrer d\'Olot, s/n, Barcelona, Spain',
    category: 'other',
    imageUrl: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800',
    coordinates: { lat: 41.4145, lng: 2.1527 },
    notes: 'Book tickets online in advance to avoid queues',
    createdAt: '2025-05-12T11:20:00Z'
  }
];

export const mockUser = {
  username: 'Demo User',
  email: 'demo@localist.com'
};
