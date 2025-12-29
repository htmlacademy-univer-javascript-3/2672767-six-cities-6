import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferShort} from '../../types/offer.ts';

import {offers} from '../../mocks/offers.ts';

export interface FavoritesState {
  items: OfferShort[];
}

const initialState: FavoritesState = {
  items: offers,
};

const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    fetchFavorites(state, action: PayloadAction<OfferShort[]>) {
      state.items = action.payload;
    },
  },
});

export const {fetchFavorites} = favoritesSlice.actions;
export const favoriteReducer = favoritesSlice.reducer;
