import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';

import OffersList from './offers-list.tsx';
import {offers} from '../../mocks/offers.ts';

vi.mock('../offer-card/offer-card.tsx', () => ({
  __esModule: true,
  default: ({offer}: { offer: { title: string } }) => <div data-testid="offer-card">{offer.title}</div>,
}));

describe('OffersList component', () => {
  it('renders list of offers for cities variant', () => {
    const {container} = render(<OffersList offers={offers.slice(0, 2)} variant="cities"/>);

    const cards = screen.getAllByTestId('offer-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent(offers[0].title);
    expect(cards[1]).toHaveTextContent(offers[1].title);
    expect(container.firstChild).toHaveClass('cities__places-list');
  });
});
