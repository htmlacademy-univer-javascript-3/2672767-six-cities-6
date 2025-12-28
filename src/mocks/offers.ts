import {OfferShort} from '../types/offer.tsx';

export const offers: OfferShort[] = [
  {
    id: '2b7f5c3a-6f9e-4e5d-8d9c-1a2b3c4d5e6f',
    title: 'Cozy studio near the canals',
    type: 'apartment',
    price: 115,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.89798,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    previewImage: '/img/apartment-01.jpg',
  },
  {
    id: '9f1e2d3c-4b5a-6789-0abc-def123456789',
    title: 'Modern room in a quiet neighborhood',
    type: 'room',
    price: 72,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.89798,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.1,
    previewImage: '/img/room.jpg',
  },
  {
    id: '5d4c3b2a-1f0e-4d3c-8b7a-6c5d4e3f2a1b',
    title: 'Spacious family house with garden',
    type: 'house',
    price: 210,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.89798,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 15
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    previewImage: '/img/apartment-02.jpg',
  },
  {
    id: 'c8a7b6d5-e4f3-4a21-9b0c-1d2e3f4a5b6c',
    title: 'Charming hotel suite in the historic center',
    type: 'hotel',
    price: 160,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.89798,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.3,
    previewImage: '/img/apartment-03.jpg'
  }
];
