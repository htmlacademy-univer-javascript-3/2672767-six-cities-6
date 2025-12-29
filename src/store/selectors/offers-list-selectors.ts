import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index.ts';
import {selectCurrentCity} from './city-selectors.ts';
import {OfferShort} from '../../types/offer.ts';
import {SortingType} from '../../types/sorting.ts';

export const selectOffersState = (state: RootState) => state.offersList;
export const selectOffers = (state: RootState) => selectOffersState(state).items;

export const selectOffersByCurrentCity = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity): OfferShort[] => offers.filter((offer) => offer.city.name === currentCity)
);

export const selectSortingType = (state: RootState): SortingType => selectOffersState(state).sortingType;

export const selectSortedOffersByCurrentCity = createSelector(
  [selectOffersByCurrentCity, selectSortingType],
  (offers, sortingType) => {
    switch (sortingType) {
      case 'priceLowToHigh':
        return [...offers].sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return [...offers].sort((a, b) => b.price - a.price);
      case 'topRated':
        return [...offers].sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return [...offers];
    }
  }
);
