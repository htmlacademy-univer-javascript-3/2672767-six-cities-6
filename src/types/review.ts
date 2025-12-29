import {UserCommon} from './user.ts';

export interface Review {
  id: string;
  date: string;
  user: UserCommon;
  comment: string;
  rating: number;
}

export interface ReviewFormData {
  comment: string;
  rating: number;
}
