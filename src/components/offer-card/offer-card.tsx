import {FC, memo, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {OfferShort} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const/auth.ts';
import {selectAuthorizationStatus} from '../../store/selectors';
import {changeFavoriteStatusAction} from '../../store/slices/favorite-slice.ts';

type OfferCardVariant = 'cities' | 'favorites' | 'near';

interface OfferCardProps {
  offer: OfferShort;
  variant: OfferCardVariant;
  isActive?: boolean;
  handleOfferHover?: (offerId: OfferShort['id'] | null) => void;
}

const OfferCardComponent: FC<OfferCardProps> = ({offer, variant, isActive, handleOfferHover}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const {id, title, type, price, isFavorite, isPremium, rating, previewImage} = offer;

  // Bookmark block
  const bookmarkStatusClassName = isFavorite ? 'place-card__bookmark-button--active' : '';
  const bookmarkStatusText = isFavorite ? 'In bookmarks' : 'To bookmarks';

  // Rating block
  const ratingStarsWidth = `${(100 * Math.round(rating) / 5)}%`;

  // Card styles by variant
  let articleClassName,
    imageWrapperClassName,
    infoClassName,
    imageWidth,
    imageHeight;

  switch (variant) {
    case 'cities': {
      articleClassName = 'cities__card place-card';
      imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper';
      infoClassName = 'place-card__info';
      imageWidth = '260';
      imageHeight = '200';
      break;
    }
    case 'favorites': {
      articleClassName = 'favorites__card place-card';
      imageWrapperClassName = 'favorites__image-wrapper place-card__image-wrapper';
      infoClassName = 'favorites__card-info place-card__info';
      imageWidth = '150';
      imageHeight = '110';
      break;
    }
    case 'near': {
      articleClassName = 'near-places__card place-card';
      imageWrapperClassName = 'near-places__image-wrapper place-card__image-wrapper';
      infoClassName = 'place-card__info';
      imageWidth = '260';
      imageHeight = '200';
      break;
    }
  }
  // Выделение активного элемента классом
  const activeClassName = isActive ? ' place-card--active' : '';

  const onMouseEnter = useCallback(() => {
    handleOfferHover?.(id);
  }, [handleOfferHover, id]);

  const onMouseLeave = useCallback(() => {
    handleOfferHover?.(null);
  }, [handleOfferHover]);

  const handleBookmarkClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(changeFavoriteStatusAction({offerId: id, status: !isFavorite}));
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);

  return (
    <article
      className={`${articleClassName}${activeClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={imageWrapperClassName}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${bookmarkStatusClassName} button`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarkStatusText}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingStarsWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>);
};

const OfferCard = memo(OfferCardComponent);
export default OfferCard;
