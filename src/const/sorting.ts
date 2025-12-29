import {SortingOption, SortingType} from '../types/sorting.ts';

export const DEFAULT_SORTING_TYPE: SortingType = 'popular';

export const SORTING_OPTIONS: ReadonlyArray<SortingOption> = [
  {value: 'popular', label: 'Popular'},
  {value: 'priceLowToHigh', label: 'Price: low to high'},
  {value: 'priceHighToLow', label: 'Price: high to low'},
  {value: 'topRated', label: 'Top rated first'},
];
