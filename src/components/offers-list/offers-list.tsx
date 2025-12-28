import {FC} from 'react';
import OfferCard from '../offer-card/offer-card.tsx';
import {OfferShort} from '../../types/offer.ts';

type OffersListVariant = 'cities' | 'favorites' | 'near';

interface OffersListProps {
  offers: OfferShort[];
  variant: OffersListVariant;
  activeOfferId?: OfferShort['id'] | null;
  handleOfferHover?: (offerId: OfferShort['id'] | null) => void;
}

const OffersList: FC<OffersListProps> = ({offers, variant, activeOfferId, handleOfferHover}) => {

  let listClassName;
  switch (variant) {
    case 'cities': {
      listClassName = 'cities__places-list places__list tabs__content';
      break;
    }
    case 'favorites': {
      listClassName = 'favorites__places';
      break;
    }
    case 'near': {
      listClassName = 'near-places__list places__list';
      break;
    }
  }


  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={variant}
          isActive={offer.id === activeOfferId}
          handleOfferHover={handleOfferHover}
        />
      ))}
    </div>
  );
};

export default OffersList;
