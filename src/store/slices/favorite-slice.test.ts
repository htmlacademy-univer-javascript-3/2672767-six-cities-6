import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it} from 'vitest';

import {
  changeFavoriteStatusAction,
  favoriteReducer,
  FavoritesState,
  fetchFavoriteOffersAction
} from './favorite-slice.ts';
import {logoutAction} from './user-slice.ts';
import {RequestStatuses} from '../../const/api.ts';
import {offers} from '../../mocks/offers.ts';

const initialState: FavoritesState = {
  items: [],
  status: RequestStatuses.Idle,
  error: null,
};

describe('favoriteSlice reducer', () => {
  it('should return the initial state when action is unknown', () => {
    const result = favoriteReducer(undefined, {type: 'UNKNOWN_ACTION'});

    expect(result).toEqual(initialState);
  });

  it('should set loading status when "fetchFavoriteOffersAction" is pending', () => {
    const result = favoriteReducer(initialState, {type: fetchFavoriteOffersAction.pending.type});

    expect(result.status).toBe(RequestStatuses.Loading);
    expect(result.error).toBeNull();
  });

  it('should set favorite offers and success status when "fetchFavoriteOffersAction" is fulfilled', () => {
    const result = favoriteReducer(initialState, {
      type: fetchFavoriteOffersAction.fulfilled.type,
      payload: offers,
    });

    expect(result.items).toEqual(offers);
    expect(result.status).toBe(RequestStatuses.Succeeded);
  });

  it('should set failed status and error when "fetchFavoriteOffersAction" is rejected', () => {
    const errorMessage = 'Unable to load';
    const result = favoriteReducer(initialState, {
      type: fetchFavoriteOffersAction.rejected.type,
      error: {message: errorMessage},
    });

    expect(result.status).toBe(RequestStatuses.Failed);
    expect(result.error).toBe(errorMessage);
  });

  it('should add new favorite on "changeFavoriteStatusAction" fulfilled with new item', () => {
    const updatedOffer = {...offers[0], isFavorite: true};
    const result = favoriteReducer(initialState, {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer,
    });

    expect(result.items).toContainEqual(updatedOffer);
  });

  it('should remove item when "changeFavoriteStatusAction" fulfilled with non-favorite', () => {
    const existing = {...offers[0], isFavorite: true};
    const state: FavoritesState = {
      ...initialState,
      items: [existing],
    };

    const result = favoriteReducer(state, {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: {...existing, isFavorite: false},
    });

    expect(result.items).toHaveLength(0);
  });

  it('should reset state when "logoutAction" is fulfilled', () => {
    const filledState: FavoritesState = {
      items: [offers[0]],
      status: RequestStatuses.Succeeded,
      error: 'error',
    };

    const result = favoriteReducer(filledState, {type: logoutAction.fulfilled.type});

    expect(result).toEqual(initialState);
  });
});

describe('favoriteSlice async operations', () => {
  let api: ReturnType<typeof axios.create>;
  let mockAPI: MockAdapter;

  beforeEach(() => {
    api = axios.create();

    mockAPI = new MockAdapter(api);
  });

  it('should fetch favorite offers successfully', async () => {
    const store = configureStore({
      reducer: {favorite: favoriteReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    mockAPI.onGet('/favorite').reply(200, offers);

    await store.dispatch(fetchFavoriteOffersAction());

    const state = store.getState().favorite;
    expect(state.items).toEqual(offers);
    expect(state.status).toBe(RequestStatuses.Succeeded);
  });

  it('should toggle favorite status successfully', async () => {
    const store = configureStore({
      reducer: {favorite: favoriteReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
      preloadedState: {
        favorite: {
          ...initialState,
          items: [offers[0]],
        },
      },
    });

    const updatedOffer = {...offers[0], isFavorite: false};
    mockAPI.onPost(`/favorite/${offers[0].id}/0`).reply(200, updatedOffer);

    const result = await store.dispatch(changeFavoriteStatusAction({offerId: offers[0].id, status: false}));

    const state = store.getState().favorite;
    expect(changeFavoriteStatusAction.fulfilled.match(result)).toBe(true);
    expect(state.items).toHaveLength(0);
  });
});
