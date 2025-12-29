import {OfferShort} from '../types/offer.ts';

export const offers: OfferShort[] = [
  {
    id: '1b7f5c3a-6f9e-4e5d-8d9c-1a2b3c4d5e6f',
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
    id: '01e2d3c-4b5a-6789-0abc-def123456789',
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
  },
  {
    id: 'c6d9f4b0-8c43-4c38-9e69-7b6cfd2a01f5',
    title: 'Stylish loft in the heart of Paris',
    type: 'apartment',
    price: 145,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-01.jpg',
  },
  {
    id: '1a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809',
    title: 'Cozy studio near the cathedral',
    type: 'apartment',
    price: 98,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 12
      }
    },
    location: {
      latitude: 50.939361,
      longitude: 6.979974,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
    previewImage: '/img/apartment-02.jpg',
  },
  {
    id: '8f7e6d5c-4b3a-2910-8f7e-6d5c4b3a2910',
    title: 'Historic townhouse with modern comfort',
    type: 'house',
    price: 180,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 12
      }
    },
    location: {
      latitude: 50.848557,
      longitude: 4.371697,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: '/img/apartment-03.jpg',
  },
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
    title: 'Riverside room with skyline view',
    type: 'room',
    price: 88,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 9.992987,
        zoom: 12
      }
    },
    location: {
      latitude: 53.549341,
      longitude: 10.002987,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/room.jpg',
  },
  {
    id: 'q8a7b6d5-e4f3-4a21-9b0c-1d2e3f4q5b6c',
    title: 'Boutique hotel suite downtown',
    type: 'hotel',
    price: 160,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 12
      }
    },
    location: {
      latitude: 51.227402,
      longitude: 6.786314,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.3,
    previewImage: '/img/apartment-03.jpg',
  }
];
