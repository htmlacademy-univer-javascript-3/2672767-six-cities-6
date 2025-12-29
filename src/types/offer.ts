import {City} from './city.ts';
import {MapLocation} from './map-location.ts';
import {UserCommon} from './user.ts';

export interface OfferCommon {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: MapLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export interface OfferShort extends OfferCommon{
  previewImage: string;
}


export interface OfferFull extends OfferCommon{
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserCommon;
  images: string[];
  maxAdults: number;
}
