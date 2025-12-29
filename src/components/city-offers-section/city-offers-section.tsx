import {FC, memo, useCallback, useState} from 'react';
import Map from '../map/map.tsx';
import SortingOptions from '../sorting-options/sorting-options.tsx';
import OffersList from '../offers-list/offers-list.tsx';

import {OfferShort} from '../../types/offer.ts';

interface CityOffersSectionProps {
  currentCity: string;
  offers: OfferShort[];
}

interface CityOffersSectionProps {
  currentCity: string;
  offers: OfferShort[];
}

const CityOffersSectionComponent: FC<CityOffersSectionProps> = ({currentCity, offers}) => {
  const [activeOfferId, setActiveOfferId] = useState<OfferShort['id'] | null>(null);

  const handleOfferHover = useCallback((offerId: OfferShort['id'] | null) => {
    setActiveOfferId(offerId);
  }, []);

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>

        <SortingOptions/>
        <OffersList
          offers={offers}
          variant="cities"
          activeOfferId={activeOfferId}
          handleOfferHover={handleOfferHover}
        />

      </section>
      <div className="cities__right-section">
        <Map offers={offers} activeOfferId={activeOfferId}/>
      </div>
    </>
  );
};

const CityOffersSection = memo(CityOffersSectionComponent);
export default CityOffersSection;

