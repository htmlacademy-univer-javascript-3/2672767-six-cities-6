import {configureStore} from '@reduxjs/toolkit';

import {offersListReducer} from './slices/offers-list-slice.ts';
import {cityReducer} from './slices/city-slice.ts';
import {favoriteReducer} from './slices/favorite-slice.ts';
import {apiClient} from '../api/api.ts';

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offersList: offersListReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiClient,
      },
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
