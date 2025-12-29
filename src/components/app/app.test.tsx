import {render, screen} from '@testing-library/react';
import {beforeEach, describe, it, vi} from 'vitest';

import App from './app.tsx';
import {AuthorizationStatus} from '../../const/auth.ts';

const mockDispatch = vi.fn();
const mockUseAppSelector = vi.fn();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useAppSelector: (selector: unknown) => mockUseAppSelector(selector),
}));
vi.mock('../../pages/main', () => ({default: () => <div>Main Page</div>}));
vi.mock('../../pages/login', () => ({default: () => <div>Login Page</div>}));
vi.mock('../../pages/favorites', () => ({default: () => <div>Favorites Page</div>}));
vi.mock('../../pages/offer', () => ({default: () => <div>Offer Page</div>}));
vi.mock('../../pages/not-found', () => ({default: () => <div>Not Found Page</div>}));

describe('Application routing', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockUseAppSelector.mockReset();
  });

  it('should render main page when navigating to "/"', () => {
    mockUseAppSelector.mockReturnValue(AuthorizationStatus.Auth);
    window.history.pushState({}, '', '/');

    render(<App/>);

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });

  it('should render login page when navigating to "/login"', () => {
    mockUseAppSelector.mockReturnValue(AuthorizationStatus.Auth);
    window.history.pushState({}, '', '/login');

    render(<App/>);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should redirect to login from private route when user is not authorized', () => {
    mockUseAppSelector.mockReturnValue(AuthorizationStatus.NoAuth);
    window.history.pushState({}, '', '/favorites');

    render(<App/>);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should render not found page on unknown route', () => {
    mockUseAppSelector.mockReturnValue(AuthorizationStatus.Auth);
    window.history.pushState({}, '', '/unknown-route');

    render(<App/>);

    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
