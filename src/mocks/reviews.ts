import {Review} from '../types/review.ts';

export const reviews: Review[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: '0a6a4fcf-4720-4d14-95a7-8d0fd1bc64e9',
    date: '2019-07-12T10:45:22.818Z',
    user: {
      name: 'Sophie Fisher',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'Lovely canal-side apartment with a warm atmosphere and super friendly host. Will definitely come back.',
    rating: 5,
  },
  {
    id: '1f9d02c0-6238-4d7d-9c5d-3b28e8370fb5',
    date: '2019-10-03T18:02:11.103Z',
    user: {
      name: 'Liam Carter',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'Great location and comfy beds, though the street can be a bit noisy in the evening.',
    rating: 3,
  },
];
