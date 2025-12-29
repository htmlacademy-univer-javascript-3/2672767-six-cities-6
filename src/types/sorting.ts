export type SortingType = 'popular' | 'priceLowToHigh' | 'priceHighToLow' | 'topRated';

export interface SortingOption {
  value: SortingType;
  label: string;
}
