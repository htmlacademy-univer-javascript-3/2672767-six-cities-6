import {FC, useMemo} from 'react';

import {Review as ReviewType} from '../../types/review.ts';
import Review from '../review/review.tsx';

interface ReviewListProps {
  reviews: ReviewType[];
}

const REVIEWS_LIMIT = 10;

const ReviewsList: FC<ReviewListProps> = ({reviews}) => {
  const preparedReviews = useMemo(
    () => [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, REVIEWS_LIMIT),
    [reviews]
  );

  if (preparedReviews.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className=" reviews__list">
        {preparedReviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
    </>
  );
};

export default ReviewsList;
