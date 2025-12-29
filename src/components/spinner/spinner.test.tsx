import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import Spinner from './spinner.tsx';

describe('Spinner component', () => {
  it('renders loading text and status role', () => {
    render(<Spinner/>);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
