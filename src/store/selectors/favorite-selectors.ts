import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index.ts';
import {FavoriteOffersByCity} from '../../types/favorite.ts';

export const selectFavoritesState = (state: RootState) => state.favorite;

export const selectFavoriteOffers = createSelector(
  [selectFavoritesState],
  (favoritesState) => favoritesState.items
);
export const selectFavoriteStatus = (state: RootState) =>
  selectFavoritesState(state).status;


export const selectFavoriteOffersByCity = createSelector(
  [selectFavoriteOffers],
  (favoriteOffers): FavoriteOffersByCity => favoriteOffers.reduce<FavoriteOffersByCity>((acc, offer) => {
    const cityName = offer.city.name;
    let offersForCity = acc[cityName];

    if (!offersForCity) {
      offersForCity = [];
      acc[cityName] = offersForCity;
    }

    offersForCity.push(offer);
    return acc;
  }, {})
);
