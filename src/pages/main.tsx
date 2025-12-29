import {FC, useEffect} from 'react';

import Header from '../components/header/header.tsx';
import CitiesList from '../components/cities-list/cities-list.tsx';
import Spinner from '../components/spinner/spinner.tsx';
import CityOffersSection from '../components/city-offers-section/city-offers-section.tsx';

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

  useEffect(() => {

    if (offersStatus === RequestStatuses.Idle) {
      dispatch(fetchOffersAction());
    }
  }, [dispatch, offersStatus]);

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
              <CityOffersSection currentCity={currentCity} offers={sortedOffersByCurrenCity}/>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
