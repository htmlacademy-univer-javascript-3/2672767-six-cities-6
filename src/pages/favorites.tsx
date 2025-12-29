import {FC, useEffect} from 'react';

import OffersList from '../components/offers-list/offers-list.tsx';
import Header from '../components/header/header.tsx';
import FavoritesEmptyPage from './favorites-empty.tsx';
import {CITY_NAMES} from '../const/city.ts';
import {RequestStatuses} from '../const/api.ts';
import {selectFavoriteOffers, selectFavoriteOffersByCity, selectFavoriteStatus} from '../store/selectors';
import {useAppDispatch, useAppSelector} from '../hooks';
import Spinner from '../components/spinner/spinner.tsx';
import {fetchFavoriteOffersAction} from '../store/slices/favorite-slice.ts';

interface FavoritesPageProps {
}

const FavoritesPage: FC<FavoritesPageProps> = () => {
  const dispatch = useAppDispatch();
  const favoriteOffersByCity = useAppSelector(selectFavoriteOffersByCity);
  const allFavoriteOffers = useAppSelector(selectFavoriteOffers);
  const favoriteStatus = useAppSelector(selectFavoriteStatus);

  useEffect(() => {
    if (favoriteStatus === RequestStatuses.Idle) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, favoriteStatus]);

  if (favoriteStatus === RequestStatuses.Loading) {
    return <Spinner/>;
  }

  if (favoriteStatus === RequestStatuses.Succeeded && allFavoriteOffers.length === 0) {
    return <FavoritesEmptyPage/>;
  }

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
