import {RootState} from '..';

export const selectOfferState = (state: RootState) => state.offer;

export const selectCurrentOffer = (state: RootState) => selectOfferState(state).offer;
export const selectOfferStatus = (state: RootState) => selectOfferState(state).offerStatus;
export const selectIsOfferNotFound = (state: RootState) => selectOfferState(state).isNotFound;

export const selectNearbyOffers = (state: RootState) => selectOfferState(state).nearbyOffers;

export const selectReviews = (state: RootState) => selectOfferState(state).reviews;
export const selectReviewSendingStatus = (state: RootState) => selectOfferState(state).reviewSendingStatus;
