import {FC} from 'react';

import OffersList from '../components/offers-list/offers-list.tsx';
import Header from '../components/header/header.tsx';
import {CITY_NAMES} from '../const/city.ts';
import {selectFavoriteOffersByCity} from '../store/selectors';
import {useAppSelector} from '../hooks';

interface FavoritesPageProps {
}

const FavoritesPage: FC<FavoritesPageProps> = () => {
  const favoriteOffersByCity = useAppSelector(selectFavoriteOffersByCity);

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITY_NAMES.map((city) => {
                const favoriteOffers = favoriteOffersByCity[city];

                if (!favoriteOffers) {
                  return null;
                }

                return (

                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>

                    <OffersList offers={favoriteOffers} variant="favorites"/>

                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="#">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
