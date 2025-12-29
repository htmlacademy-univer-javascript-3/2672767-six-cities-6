import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index.ts';
import {selectCurrentCity} from './city-selectors.ts';
import {OfferShort} from '../../types/offer.ts';
import {SortingType} from '../../types/sorting.ts';
import {RequestStatuses} from '../../const/api.ts';

export const selectOffersState = (state: RootState) => state.offersList;
export const selectOffers = (state: RootState) => selectOffersState(state).items;
export const selectOffersStatus = (state: RootState) =>
  selectOffersState(state).status;
export const selectOffersError = (state: RootState) => selectOffersState(state).error;

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

export const selectOffersContentData = createSelector(
  [selectCurrentCity, selectSortedOffersByCurrentCity, selectOffersStatus],
  (currentCity, sortedOffersByCurrenCity, status) => ({
    currentCity,
    sortedOffersByCurrenCity,
    status,
    isLoading: status === RequestStatuses.Loading,
  })
);
