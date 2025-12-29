import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {OfferShort} from '../../types/offer.ts';
import {SortingType} from '../../types/sorting.ts';
import {DEFAULT_SORTING_TYPE} from '../../const/sorting.ts';
import {RequestStatuses} from '../../const/api.ts';

export interface OffersListState {
  items: OfferShort[];
  sortingType: SortingType;
  status: RequestStatuses;
  error: string | null;
}

const initialState: OffersListState = {
  items: [],
  sortingType: DEFAULT_SORTING_TYPE,
  status: RequestStatuses.Idle,
  error: null,
};

export const fetchOffersAction = createAsyncThunk<
  OfferShort[],
  undefined,
  { extra: AxiosInstance }
>(
  'offerList/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferShort[]>('/offers');
    return data;
  }
);

const offersListSlice = createSlice({
  name: 'offerList',
  initialState,
  reducers: {
    setSortingType(state, action: PayloadAction<SortingType>) {
      state.sortingType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = RequestStatuses.Loading;
        state.error = null;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatuses.Succeeded;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.status = RequestStatuses.Failed;
        state.error = action.error.message ?? 'Unable to load offers';
      });
  }
});

export const {setSortingType} = offersListSlice.actions;
export const offersListReducer = offersListSlice.reducer;
