import {FC, useCallback, useEffect, useState} from 'react';

import OffersList from '../components/offers-list/offers-list.tsx';
import Header from '../components/header/header.tsx';
import Map from '../components/map/map.tsx';
import CitiesList from '../components/cities-list/cities-list.tsx';
import Spinner from '../components/spinner/spinner.tsx';
import SortingOptions from '../components/sorting-options/sorting-options.tsx';

import {OfferShort} from '../types/offer.ts';
import {selectOffersContentData,} from '../store/selectors';
import {fetchOffersAction} from '../store/slices/offers-list-slice.ts';
import {RequestStatuses} from '../const/api.ts';
import {useAppDispatch, useAppSelector} from '../hooks';

interface MainPageProps {
}

const MainPage: FC<MainPageProps> = () => {
  const dispatch = useAppDispatch();
  const {
    currentCity,
    sortedOffersByCurrenCity,
    status: offersStatus,
    isLoading,
  } = useAppSelector(selectOffersContentData);

  const [activeOfferId, setActiveOfferId] = useState<OfferShort['id'] | null>(null);

  useEffect(() => {

    if (offersStatus === RequestStatuses.Idle) {
      dispatch(fetchOffersAction());
    }
  }, [dispatch, offersStatus]);

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
            {isLoading && <Spinner/>}
            {!isLoading && (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortedOffersByCurrenCity.length} places to stay in {currentCity}</b>

                  <SortingOptions/>
                  <OffersList
                    offers={sortedOffersByCurrenCity}
                    variant="cities"
                    activeOfferId={activeOfferId}
                    handleOfferHover={handleOfferHover}
                  />

                </section>
                <div className="cities__right-section">
                  <Map offers={sortedOffersByCurrenCity} activeOfferId={activeOfferId}/>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
