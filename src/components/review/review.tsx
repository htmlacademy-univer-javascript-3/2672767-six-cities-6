import {FC} from 'react';

import {Review as ReviewType} from '../../types/review.ts';

interface ReviewProps {
  review: ReviewType;
}

const formatReviewDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return {dateTime: date, dateText: date};
  }

  return {
    dateTime: parsedDate.toISOString().split('T')[0],
    dateText: parsedDate.toLocaleString('en-US', {month: 'long', year: 'numeric'}),
  };
};

const Review: FC<ReviewProps> = ({review}) => {
  const {
    user: {name, avatarUrl},
    comment,
    rating,
    date,
  } = review;

  const ratingStarsWidth = `${(100 * Math.round(rating) / 5)}%`;

  const {dateTime, dateText} = formatReviewDate(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt={`${name}'s avatar`}
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: ratingStarsWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={dateTime}>
          {dateText}
        </time>
      </div>
    </li>
  );
};

export default Review;
