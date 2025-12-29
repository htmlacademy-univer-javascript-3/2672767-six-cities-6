import {FC, MouseEvent, useMemo, useState} from 'react';

import {SortingType} from '../../types/sorting.ts';
import {SORTING_OPTIONS} from '../../const/sorting.ts';

import {setSortingType} from '../../store/slices/offers-list-slice.ts';
import {selectSortingType} from '../../store/selectors';
import {useAppDispatch, useAppSelector} from '../../hooks';


const SortingOptions: FC = () => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectSortingType);

  const [isOpened, setIsOpened] = useState(false);

  const toggleOpened = () => {
    setIsOpened((prevState) => !prevState);
  };

  const closeList = () => {
    setIsOpened(false);
  };

  const handleSortChange = (sortType: SortingType) => {
    closeList();
    if (sortType !== currentSort) {
      dispatch(setSortingType(sortType));
    }
  };

  const handleOptionClick = (sortType: SortingType) => (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleSortChange(sortType);
  };

  const currentLabel = useMemo(
    () =>
      SORTING_OPTIONS.find((opt) => opt.value === currentSort)?.label || 'Popular',
    [currentSort]
  );
  return (
    <form className="places__sorting">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        role="button"
        onClick={toggleOpened}
      >
        {currentLabel}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpened ? ' places__options--opened' : ''}`}>
        {SORTING_OPTIONS.map((option) => (
          <li
            key={option.value}
            className={`places__option${currentSort === option.value ? ' places__option--active' : ''}`}
            tabIndex={0}
            role="option"
            aria-selected={currentSort === option.value}
            onClick={handleOptionClick(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortingOptions;
