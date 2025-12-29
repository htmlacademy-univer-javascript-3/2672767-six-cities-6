import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosInstance} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {OfferFull, OfferShort} from '../../types/offer.ts';
import {Review, ReviewFormData} from '../../types/review.ts';
import {RequestStatuses} from '../../const/api.ts';

export interface OfferState {
  offer: OfferFull | null;
  offerStatus: RequestStatuses;
  nearbyOffers: OfferShort[];
  nearbyStatus: RequestStatuses;
  reviews: Review[];
  reviewsStatus: RequestStatuses;
  reviewSendingStatus: RequestStatuses;
  isNotFound: boolean;
  error: string | null;
}

const initialState: OfferState = {
  offer: null,
  offerStatus: RequestStatuses.Idle,
  nearbyOffers: [],
  nearbyStatus: RequestStatuses.Idle,
  reviews: [],
  reviewsStatus: RequestStatuses.Idle,
  reviewSendingStatus: RequestStatuses.Idle,
  isNotFound: false,
  error: null,
};

export const fetchOfferAction = createAsyncThunk<
  OfferFull,
  string,
  { extra: AxiosInstance; rejectValue: StatusCodes }
>(
  'offer/fetchOffer',
  async (offerId, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<OfferFull>(`/offers/${offerId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        return rejectWithValue(StatusCodes.NOT_FOUND);
      }

      throw error;
    }
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<
  OfferShort[],
  string,
  { extra: AxiosInstance }
>(
  'offer/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferShort[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>(
  'offer/fetchReviews',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<
  Review,
  { offerId: string; reviewData: ReviewFormData },
  { extra: AxiosInstance }
>(
  'offer/postReview',
  async ({offerId, reviewData}, {extra: api}) => {
    const {data} = await api.post<Review>(`/comments/${offerId}`, reviewData);
    return data;
  }
);

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    resetOfferState() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerStatus = RequestStatuses.Loading;
        state.error = null;
        state.isNotFound = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offerStatus = RequestStatuses.Succeeded;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.offerStatus = RequestStatuses.Failed;
        state.error = action.error.message ?? 'Unable to load offer';
        state.isNotFound = action.payload === StatusCodes.NOT_FOUND;
      })

      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.nearbyStatus = RequestStatuses.Loading;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyStatus = RequestStatuses.Succeeded;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyStatus = RequestStatuses.Failed;
      })

      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsStatus = RequestStatuses.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsStatus = RequestStatuses.Succeeded;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsStatus = RequestStatuses.Failed;
      })

      .addCase(postReviewAction.pending, (state) => {
        state.reviewSendingStatus = RequestStatuses.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewSendingStatus = RequestStatuses.Succeeded;
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewSendingStatus = RequestStatuses.Failed;
      });
  }
});

export const {resetOfferState} = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
