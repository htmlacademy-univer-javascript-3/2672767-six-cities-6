import {describe, it, expect} from 'vitest';
import {cityReducer, changeCity, CityState} from './city-slice.ts';
import {CITY_NAMES} from '../../const/city.ts';

describe('citySlice reducer', () => {
  const initialState: CityState = {
    currentCity: CITY_NAMES[0],
  };

  it('should return the initial state when action is unknown', () => {
    const result = cityReducer(undefined, {type: 'UNKNOWN_ACTION'});

    expect(result).toEqual(initialState);
  });

  it('should change current city with "changeCity" action', () => {
    const targetCity = CITY_NAMES[1];

    const result = cityReducer(initialState, changeCity(targetCity));

    expect(result.currentCity).toBe(targetCity);
  });
});
