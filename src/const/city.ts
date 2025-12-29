import {City} from '../types/city.ts';

export const CITY_DATA: Record<string, City> = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 12,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.89798,
      zoom: 10,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 9.992987,
      zoom: 12,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 12,
    },
  },
};


export const CITY_NAMES: readonly string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];
