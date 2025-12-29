import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferShort} from '../../types/offer.ts';
import {offers} from '../../mocks/offers.ts';

export interface OfferState {
  items: OfferShort[];
}

const initialState: OfferState = {
  items: offers,
};

const offersListSlice = createSlice({
  name: 'offerList',
  initialState,
  reducers: {
    fetchOffers(state, action: PayloadAction<OfferShort[]>) {
      state.items = action.payload;
    },
  },
});

export const {fetchOffers} = offersListSlice.actions;
export const offersListReducer = offersListSlice.reducer;
