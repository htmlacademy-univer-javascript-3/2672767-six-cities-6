import {ChangeEvent, FC, FormEvent, Fragment, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {postReviewAction} from '../../store/slices/offer-slice.ts';
import {selectReviewSendingStatus} from '../../store/selectors';
import {RequestStatuses} from '../../const/api.ts';

const ratingOptions = [
  {value: '5', title: 'perfect'},
  {value: '4', title: 'good'},
  {value: '3', title: 'not bad'},
  {value: '2', title: 'badly'},
  {value: '1', title: 'terribly'}
];

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

interface ReviewFormProps {
  offerId: string;
}

const ReviewForm: FC<ReviewFormProps> = ({offerId}) => {
  const dispatch = useAppDispatch();
  const reviewSendingStatus = useAppSelector(selectReviewSendingStatus);
  const [rating, setRating] = useState<string>('');
  const [review, setReview] = useState<string>('');

  const isSubmitting = reviewSendingStatus === RequestStatuses.Loading;


  // Определение заблокирована ли форма или нет
  const isSubmitDisabled = useMemo(() => {
    const trimmedLength = review.trim().length;
    return trimmedLength < MIN_REVIEW_LENGTH || trimmedLength > MAX_REVIEW_LENGTH || rating === '';
  }, [rating, review]);

  // Обработки полей форм
  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.target;

    setReview(value.slice(0, MAX_REVIEW_LENGTH));
  };

  useEffect(() => {
    if (reviewSendingStatus === RequestStatuses.Succeeded) {
      setRating('');
      setReview('');
    }
  }, [reviewSendingStatus]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isSubmitDisabled || isSubmitting) {
      return;
    }

    dispatch(postReviewAction({
      offerId,
      reviewData: {
        comment: review.trim(),
        rating: Number(rating),
      }
    }));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions.map(({value, title}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
        disabled={isSubmitting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={isSubmitDisabled || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
