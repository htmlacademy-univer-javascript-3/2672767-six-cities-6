import {FC, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

import OffersList from '../components/offers-list/offers-list.tsx';
import Header from '../components/header/header.tsx';
import Map from '../components/map/map.tsx';
import CitiesList from '../components/cities-list/cities-list.tsx';

import {OfferShort} from '../types/offer.ts';
import {
  selectCurrentCity,
  selectSortedOffersByCurrentCity
} from '../store/selectors';
import SortingOptions from '../components/sorting-options/sorting-options.tsx';

interface MainPageProps {
}

const MainPage: FC<MainPageProps> = () => {
  const currentCity = useSelector(selectCurrentCity);
  const offersByCurrentCity = useSelector(selectSortedOffersByCurrentCity);

  const [activeOfferId, setActiveOfferId] = useState<OfferShort['id'] | null>(null);

  const handleOfferHover = useCallback((offerId: OfferShort['id'] | null) => {
    setActiveOfferId(offerId);
  }, []);


  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              currentCity={currentCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCurrentCity.length} places to stay in {currentCity}</b>

              <SortingOptions/>
              <OffersList
                offers={offersByCurrentCity}
                variant="cities"
                activeOfferId={activeOfferId}
                handleOfferHover={handleOfferHover}
              />

            </section>
            <div className="cities__right-section">
              <Map offers={offersByCurrentCity} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
