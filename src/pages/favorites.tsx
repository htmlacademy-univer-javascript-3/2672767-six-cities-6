import {FC} from 'react';
import {OfferShort} from '../types/offer.tsx';
import OffersList from '../components/offers-list/offers-list.tsx';
import Header from '../components/header/header.tsx';

type FavoritesPageProps = {
  offers: OfferShort[];
};

const FavoritesPage: FC<FavoritesPageProps> = ({offers}) => (
  <div className="page">
    <Header/>

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {offers.map((offer) => (
              <li className="favorites__locations-items" key={offer.id}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{offer.city.name}</span>
                    </a>
                  </div>
                </div>

                <OffersList offers={[offer]} variant="favorites"/>

              </li>
            ))}
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

export default FavoritesPage;
