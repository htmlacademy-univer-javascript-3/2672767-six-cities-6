import {RootState} from '../index.ts';

export const selectCityState = (state: RootState) => state.city;
export const selectCurrentCity = (state: RootState) => selectCityState(state).currentCity;
