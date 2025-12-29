import {FC, MouseEvent} from 'react';

import {changeCity} from '../../store/slices/city-slice.ts';
import {useAppDispatch} from '../../hooks';

import {CITY_NAMES} from '../../const/city.ts';

interface CitiesListProps {
  currentCity: string;
}

const CitiesList: FC<CitiesListProps> = ({currentCity}) => {
  const dispatch = useAppDispatch();

  const onCitySelect = (evt: MouseEvent<HTMLAnchorElement>, cityName: string) => {
    evt.preventDefault();
    if (cityName === currentCity) {
      return;
    }

    dispatch(changeCity(cityName));
  };

  return (
    <ul className="locations__list tabs__list">
      {CITY_NAMES.map((city) => {
        const linkClassName = city === currentCity
          ? 'locations__item-link tabs__item tabs__item--active'
          : 'locations__item-link tabs__item';

        return (
          <li className="locations__item" key={city}>
            <a
              className={linkClassName}
              href="#"
              onClick={(evt) => onCitySelect(evt, city)}
            >
              <span>{city}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default CitiesList;
