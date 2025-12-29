import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CITY_NAMES} from '../../const/city.ts';

export interface CityState {
  currentCity: string;
}

const initialState: CityState = {
  currentCity: CITY_NAMES[0],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.currentCity = action.payload;
    },
  },
});

export const {changeCity} = citySlice.actions;
export const cityReducer = citySlice.reducer;
