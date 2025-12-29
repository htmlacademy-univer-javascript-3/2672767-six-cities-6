import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it} from 'vitest';
import {StatusCodes} from 'http-status-codes';

import {
  OfferState,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchReviewsAction,
  offerReducer,
  postReviewAction,
  resetOfferState
} from './offer-slice.ts';
import {changeFavoriteStatusAction} from './favorite-slice.ts';
import {RequestStatuses} from '../../const/api.ts';
import {OfferFull, OfferShort} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';

const initialState: OfferState = offerReducer(undefined, {type: 'UNKNOWN_ACTION'});

const offerFull: OfferFull = {
  id: 'offer-1',
  title: 'Spacious apartment',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {latitude: 0, longitude: 0, zoom: 10},
  },
  location: {latitude: 0, longitude: 0, zoom: 10},
  isFavorite: false,
  isPremium: true,
  rating: 4.4,
  description: 'Nice place',
  bedrooms: 2,
  goods: ['Wi-Fi'],
  host: {name: 'Host', avatarUrl: '/host.jpg', isPro: true},
  images: ['/img1.jpg'],
  maxAdults: 4,
};

const nearbyOffers: OfferShort[] = [
  {
    id: 'near-1',
    title: 'Nearby offer',
    type: 'room',
    price: 80,
    city: offerFull.city,
    location: {latitude: 1, longitude: 1, zoom: 10},
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: '/img.jpg',
  },
];

const reviews: Review[] = [
  {
    id: 'review-1',
    date: '2020-01-01',
    user: {name: 'User', avatarUrl: '/avatar.jpg', isPro: false},
    comment: 'Great place',
    rating: 5,
  },
];

describe('offerSlice reducer', () => {
  it('should return initial state when action is unknown', () => {
    const result = offerReducer(undefined, {type: 'UNKNOWN_ACTION'});

    expect(result).toEqual(initialState);
  });

  it('should reset state with "resetOfferState" action', () => {
    const filledState: OfferState = {
      ...initialState,
      offer: offerFull,
      offerStatus: RequestStatuses.Succeeded,
    };

    const result = offerReducer(filledState, resetOfferState());

    expect(result).toEqual(initialState);
  });

  it('should handle "fetchOfferAction" lifecycle', () => {
    const pending = offerReducer(initialState, {type: fetchOfferAction.pending.type});
    expect(pending.offerStatus).toBe(RequestStatuses.Loading);
    expect(pending.isNotFound).toBe(false);
    expect(pending.error).toBeNull();

    const fulfilled = offerReducer(initialState, {
      type: fetchOfferAction.fulfilled.type,
      payload: offerFull,
    });
    expect(fulfilled.offer).toEqual(offerFull);
    expect(fulfilled.offerStatus).toBe(RequestStatuses.Succeeded);

    const rejected = offerReducer(initialState, {
      type: fetchOfferAction.rejected.type,
      payload: StatusCodes.NOT_FOUND,
      error: {message: 'Not found'},
    });
    expect(rejected.offerStatus).toBe(RequestStatuses.Failed);
    expect(rejected.isNotFound).toBe(true);
  });

  it('should handle nearby offers actions', () => {
    const pending = offerReducer(initialState, {type: fetchNearbyOffersAction.pending.type});
    expect(pending.nearbyStatus).toBe(RequestStatuses.Loading);

    const fulfilled = offerReducer(initialState, {
      type: fetchNearbyOffersAction.fulfilled.type,
      payload: nearbyOffers,
    });
    expect(fulfilled.nearbyOffers).toEqual(nearbyOffers);
    expect(fulfilled.nearbyStatus).toBe(RequestStatuses.Succeeded);

    const rejected = offerReducer(initialState, {type: fetchNearbyOffersAction.rejected.type});
    expect(rejected.nearbyStatus).toBe(RequestStatuses.Failed);
  });

  it('should handle reviews actions', () => {
    const pending = offerReducer(initialState, {type: fetchReviewsAction.pending.type});
    expect(pending.reviewsStatus).toBe(RequestStatuses.Loading);

    const fulfilled = offerReducer(initialState, {
      type: fetchReviewsAction.fulfilled.type,
      payload: reviews,
    });
    expect(fulfilled.reviews).toEqual(reviews);
    expect(fulfilled.reviewsStatus).toBe(RequestStatuses.Succeeded);

    const rejected = offerReducer(initialState, {type: fetchReviewsAction.rejected.type});
    expect(rejected.reviewsStatus).toBe(RequestStatuses.Failed);
  });

  it('should handle post review actions', () => {
    const pending = offerReducer(initialState, {type: postReviewAction.pending.type});
    expect(pending.reviewSendingStatus).toBe(RequestStatuses.Loading);

    const fulfilled = offerReducer(
      {...initialState, reviews},
      {type: postReviewAction.fulfilled.type, payload: reviews[0]}
    );
    expect(fulfilled.reviewSendingStatus).toBe(RequestStatuses.Succeeded);
    expect(fulfilled.reviews[0]).toEqual(reviews[0]);

    const rejected = offerReducer(initialState, {type: postReviewAction.rejected.type});
    expect(rejected.reviewSendingStatus).toBe(RequestStatuses.Failed);
  });

  it('should update current offer on "changeFavoriteStatusAction" fulfilled', () => {
    const state: OfferState = {
      ...initialState,
      offer: offerFull,
    };
    const updatedOffer = {...offerFull, isFavorite: true};

    const result = offerReducer(state, {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer,
    });

    expect(result.offer?.isFavorite).toBe(updatedOffer.isFavorite);
  });

  it('should update nearby offers on "changeFavoriteStatusAction" fulfilled', () => {
    const state: OfferState = {
      ...initialState,
      nearbyOffers,
    };
    const updatedNearby = {...nearbyOffers[0], isFavorite: true};

    const result = offerReducer(state, {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedNearby,
    });

    expect(result.nearbyOffers[0]).toEqual(updatedNearby);
  });
});

describe('offerSlice async operations', () => {
  let api: ReturnType<typeof axios.create>;
  let mockAPI: MockAdapter;

  beforeEach(() => {
    api = axios.create();
    mockAPI = new MockAdapter(api);
  });

  it('should fetch offer data successfully', async () => {
    const store = configureStore({
      reducer: {offer: offerReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    mockAPI.onGet(`/offers/${offerFull.id}`).reply(200, offerFull);

    await store.dispatch(fetchOfferAction(offerFull.id));

    const state = store.getState().offer;
    expect(state.offer).toEqual(offerFull);
    expect(state.offerStatus).toBe(RequestStatuses.Succeeded);
  });

  it('should mark offer as not found on 404 response', async () => {
    const store = configureStore({
      reducer: {offer: offerReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    mockAPI.onGet(`/offers/${offerFull.id}`).reply(StatusCodes.NOT_FOUND);

    const result = await store.dispatch(fetchOfferAction(offerFull.id));

    const state = store.getState().offer;
    expect(fetchOfferAction.rejected.match(result)).toBe(true);
    expect(state.isNotFound).toBe(true);
    expect(state.offerStatus).toBe(RequestStatuses.Failed);
  });

  it('should fetch nearby offers successfully', async () => {
    const store = configureStore({
      reducer: {offer: offerReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    mockAPI.onGet(`/offers/${offerFull.id}/nearby`).reply(200, nearbyOffers);

    await store.dispatch(fetchNearbyOffersAction(offerFull.id));

    const state = store.getState().offer;
    expect(state.nearbyOffers).toEqual(nearbyOffers);
    expect(state.nearbyStatus).toBe(RequestStatuses.Succeeded);
  });

  it('should post review successfully', async () => {
    const store = configureStore({
      reducer: {offer: offerReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
      preloadedState: {offer: {...initialState, reviews}},
    });

    const newReview = {...reviews[0], id: 'review-2'};
    mockAPI.onPost(`/comments/${offerFull.id}`).reply(200, newReview);

    const result = await store.dispatch(postReviewAction({
      offerId: offerFull.id,
      reviewData: {comment: newReview.comment, rating: newReview.rating},
    }));

    const state = store.getState().offer;
    expect(postReviewAction.fulfilled.match(result)).toBe(true);
    expect(state.reviews[0]).toEqual(newReview);
    expect(state.reviewSendingStatus).toBe(RequestStatuses.Succeeded);
  });
});
