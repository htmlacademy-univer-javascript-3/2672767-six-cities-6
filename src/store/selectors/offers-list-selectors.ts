import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index.ts';
import {selectCurrentCity} from './city-selectors.ts';
import {OfferShort} from '../../types/offer.ts';

export const selectOffersState = (state: RootState) => state.offersList;
export const selectOffers = (state: RootState) => selectOffersState(state).items;

export const selectOffersByCurrentCity = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity): OfferShort[] => offers.filter((offer) => offer.city.name === currentCity)
);
