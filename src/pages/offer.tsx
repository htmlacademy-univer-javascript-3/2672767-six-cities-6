import {FC, useEffect, useMemo} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';

import Header from '../components/header/header.tsx';
import ReviewsList from '../components/reviews-list/reviews-list.tsx';
import ReviewForm from '../components/review-form/review-form.tsx';
import OffersList from '../components/offers-list/offers-list.tsx';
import Map from '../components/map/map.tsx';
import Spinner from '../components/spinner/spinner.tsx';

import {useAppDispatch, useAppSelector} from '../hooks';
import {
  selectAuthorizationStatus,
  selectCurrentOffer,
  selectIsOfferNotFound,
  selectNearbyOffers,
  selectOfferStatus,
  selectReviews
} from '../store/selectors';
import {
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchReviewsAction,
  resetOfferState
} from '../store/slices/offer-slice.ts';
import {RequestStatuses} from '../const/api.ts';
import {AuthorizationStatus} from '../const/auth.ts';
import {changeFavoriteStatusAction} from '../store/slices/favorite-slice.ts';

const MAX_OFFER_IMAGES = 6;

const OfferPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const offer = useAppSelector(selectCurrentOffer);
  const offerStatus = useAppSelector(selectOfferStatus);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOfferNotFound = useAppSelector(selectIsOfferNotFound);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchReviewsAction(id));

    return () => {
      dispatch(resetOfferState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isOfferNotFound) {
      navigate('/404', {replace: true});
    }
  }, [isOfferNotFound, navigate]);

  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const ratingWidth = useMemo(() => {
    if (!offer) {
      return '0%';
    }
    return `${(100 * Math.round(offer.rating) / 5)}%`;
  }, [offer]);

  const offerImages = offer?.images.slice(0, MAX_OFFER_IMAGES) ?? [];
  const mapOffers = offer ? [offer, ...nearbyOffers] : [];

  if (!id) {
    return <Navigate to="/404" replace/>;
  }

  if (isOfferNotFound) {
    return <Navigate to="/404" replace/>;
  }

  if (offerStatus === RequestStatuses.Loading || offerStatus === RequestStatuses.Idle) {
    return (
      <div className="page">
        <Header/>
        <main className="page__main page__main--offer">
          <Spinner/>
        </main>
      </div>
    );
  }

  if (!offer) {
    return null;
  }

  const handleBookmarkClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(changeFavoriteStatusAction({offerId: offer.id, status: !offer.isFavorite}));
  };

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerImages.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={offer.title}/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingWidth}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                  >
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">

                <ReviewsList reviews={reviews}/>
                {isAuthorized && <ReviewForm offerId={offer.id}/>}

              </section>
            </div>
          </div>
          <section className="offer__map">

            <Map offers={mapOffers} activeOfferId={offer.id}/>

          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OffersList offers={nearbyOffers} variant={'near'}/>

          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
