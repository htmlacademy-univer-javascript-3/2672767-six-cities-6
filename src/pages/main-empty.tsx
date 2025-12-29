import {FC} from 'react';
import Header from '../components/header/header.tsx';
import CitiesList from '../components/cities-list/cities-list.tsx';

interface MainEmptyPageProps {
  currentCity: string;
}

const MainEmptyPage: FC<MainEmptyPageProps> = ({currentCity}) => (
  <div className="page page--gray page--main">
    <Header/>

    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList currentCity={currentCity}/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment
                in {currentCity}
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  </div>
);

export default MainEmptyPage;
