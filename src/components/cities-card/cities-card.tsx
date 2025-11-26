import {FC} from 'react';
import Offer from '../../types/offer.tsx';

interface PlaceCardProps {
  offer: Offer;
}

const CitiesCard: FC<PlaceCardProps> = ({offer}) => {
  const {title, type, price, isFavorite, isPremium, rating, previewImage} = offer;

  // Bookmark block
  const bookmarkStatusClassName = isFavorite ? 'place-card__bookmark-button--active' : '';
  const bookmarkStatusText = isFavorite ? 'In bookmarks' : 'To bookmarks';

  // Rating block
  const ratingStarsWidth = `${(100 * Math.round(rating) / 5)}%`;

  return (
    <article className="cities__card place-card">
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${bookmarkStatusClassName} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">${bookmarkStatusText}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingStarsWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>);
};

export default CitiesCard;
