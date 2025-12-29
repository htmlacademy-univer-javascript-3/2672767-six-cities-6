import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {describe, it, expect, beforeEach} from 'vitest';

import {offersListReducer, setSortingType, fetchOffersAction, OffersListState} from './offers-list-slice.ts';
import {changeFavoriteStatusAction} from './favorite-slice.ts';
import {DEFAULT_SORTING_TYPE} from '../../const/sorting.ts';
import {RequestStatuses} from '../../const/api.ts';
import {offers} from '../../mocks/offers.ts';

const initialState: OffersListState = {
  items: [],
  sortingType: DEFAULT_SORTING_TYPE,
  status: RequestStatuses.Idle,
  error: null,
};

describe('offersListSlice reducer', () => {
  it('should return the initial state when action is unknown', () => {
    const result = offersListReducer(undefined, {type: 'UNKNOWN_ACTION'});

    expect(result).toEqual(initialState);
  });

  it('should change sorting type with "setSortingType" action', () => {
    const targetSorting = 'priceHighToLow';

    const result = offersListReducer(initialState, setSortingType(targetSorting));

    expect(result.sortingType).toBe(targetSorting);
  });

  it('should set loading status when "fetchOffersAction" is pending', () => {
    const result = offersListReducer(initialState, {type: fetchOffersAction.pending.type});

    expect(result.status).toBe(RequestStatuses.Loading);
    expect(result.error).toBeNull();
  });

  it('should set offers and success status when "fetchOffersAction" is fulfilled', () => {
    const result = offersListReducer(initialState, {type: fetchOffersAction.fulfilled.type, payload: offers});

    expect(result.items).toEqual(offers);
    expect(result.status).toBe(RequestStatuses.Succeeded);
  });

  it('should set failed status and error when "fetchOffersAction" is rejected', () => {
    const errorMessage = 'Unable to load offers';
    const result = offersListReducer(
      initialState,
      {type: fetchOffersAction.rejected.type, error: {message: errorMessage}}
    );

    expect(result.status).toBe(RequestStatuses.Failed);
    expect(result.error).toBe(errorMessage);
  });

  it('should update favorite status for offer when "changeFavoriteStatusAction" is fulfilled', () => {
    const updatedOffer = {...offers[0], isFavorite: !offers[0].isFavorite};
    const state: OffersListState = {
      ...initialState,
      items: [offers[0]],
    };

    const result = offersListReducer(state, {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer,
    });

    expect(result.items[0]).toEqual(updatedOffer);
  });
});

describe('offersListSlice async operations', () => {
  let api: ReturnType<typeof axios.create>;
  let mockAPI: MockAdapter;

  beforeEach(() => {
    api = axios.create();
    mockAPI = new MockAdapter(api);
  });

  it('should fetch offers successfully', async () => {
    const store = configureStore({
      reducer: {offersList: offersListReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          }
        }),
    });

    mockAPI.onGet('/offers').reply(200, offers);

    await store.dispatch(fetchOffersAction());

    const state = store.getState().offersList;
    expect(state.items).toEqual(offers);
    expect(state.status).toBe(RequestStatuses.Succeeded);
  });

  it('should handle fetch offers error', async () => {
    const store = configureStore({
      reducer: {offersList: offersListReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          }
        }),
    });

    mockAPI.onGet('/offers').reply(500);

    const result = await store.dispatch(fetchOffersAction());

    const state = store.getState().offersList;
    expect(fetchOffersAction.rejected.match(result)).toBe(true);
    expect(state.status).toBe(RequestStatuses.Failed);
    expect(state.error).toBeTruthy();
  });
});
