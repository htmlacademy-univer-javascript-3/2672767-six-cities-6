import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {OfferShort} from '../../types/offer.ts';
import {RequestStatuses} from '../../const/api.ts';
import {logoutAction} from './user-slice.ts';

export interface FavoritesState {
  items: OfferShort[];
  status: RequestStatuses;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: RequestStatuses.Idle,
  error: null,
};

export const fetchFavoriteOffersAction = createAsyncThunk<
  OfferShort[],
  undefined,
  { extra: AxiosInstance }
>(
  'favorite/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferShort[]>('/favorite');
    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<
  OfferShort,
  { offerId: string; status: boolean },
  { extra: AxiosInstance }
>(
  'favorite/changeFavoriteStatus',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<OfferShort>(`/favorite/${offerId}/${status ? 1 : 0}`);
    return data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.status = RequestStatuses.Loading;
        state.error = null;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatuses.Succeeded;
      })

      .addCase(fetchFavoriteOffersAction.rejected, (state, action) => {
        state.status = RequestStatuses.Failed;
        state.error = action.error.message ?? 'Unable to load favorite offers';
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const offer = action.payload;
        const existingIndex = state.items.findIndex((favorite) => favorite.id === offer.id);

        if (offer.isFavorite) {
          if (existingIndex === -1) {
            state.items.push(offer);
          } else {
            state.items[existingIndex] = offer;
          }
        } else if (existingIndex !== -1) {
          state.items.splice(existingIndex, 1);
        }
      })
      .addCase(changeFavoriteStatusAction.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unable to update favorite status';
      })

      .addCase(logoutAction.fulfilled, () => initialState)
      .addCase(logoutAction.rejected, () => initialState);
  }
});

export const favoriteReducer = favoritesSlice.reducer;
