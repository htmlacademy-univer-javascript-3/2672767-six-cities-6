import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferShort} from '../../types/offer.ts';
import {offers} from '../../mocks/offers.ts';
import {DEFAULT_SORTING_TYPE} from '../../const/sorting.ts';
import {SortingType} from '../../types/sorting.ts';

export interface OfferState {
  items: OfferShort[];
  sortingType: SortingType;
}

const initialState: OfferState = {
  items: offers,
  sortingType: DEFAULT_SORTING_TYPE,
};

const offersListSlice = createSlice({
  name: 'offerList',
  initialState,
  reducers: {
    fetchOffers(state, action: PayloadAction<OfferShort[]>) {
      state.items = action.payload;
    },
    setSortingType(state, action: PayloadAction<SortingType>) {
      state.sortingType = action.payload;
    },
  }
});

export const {fetchOffers, setSortingType} = offersListSlice.actions;
export const offersListReducer = offersListSlice.reducer;
