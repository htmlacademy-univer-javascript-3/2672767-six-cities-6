import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';

import Review from './review.tsx';
import {reviews} from '../../mocks/reviews.ts';

describe('Review component', () => {
  it('renders review content', () => {
    const review = reviews[0];

    render(<Review review={review}/>);

    expect(screen.getByAltText(`${review.user.name}'s avatar`)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText('May 2019')).toBeInTheDocument();
  });
});
