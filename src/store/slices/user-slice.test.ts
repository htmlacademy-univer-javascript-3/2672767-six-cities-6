import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {AuthorizationStatus} from '../../const/auth.ts';
import {RequestStatuses} from '../../const/api.ts';
import {LoginData, UserFull} from '../../types/user.ts';
import {checkAuthAction, loginAction, logoutAction, userReducer, UserState} from './user-slice.ts';

vi.mock('../../services/token.ts', () => ({
  saveToken: vi.fn(),
  dropToken: vi.fn(),
  getToken: vi.fn(),
}));

const initialState: UserState = userReducer(undefined, {type: 'UNKNOWN_ACTION'});

const user: UserFull = {
  name: 'Test User',
  avatarUrl: '/avatar.jpg',
  isPro: false,
  email: 'test@test.com',
  token: 'token',
};

const loginData: LoginData = {
  email: user.email,
  password: 'password',
};

describe('userSlice reducer', () => {
  it('should return initial state when action is unknown', () => {
    const result = userReducer(undefined, {type: 'UNKNOWN_ACTION'});

    expect(result).toEqual(initialState);
  });

  it('should handle "checkAuthAction" fulfilled and rejected', () => {
    const fulfilled = userReducer(initialState, {type: checkAuthAction.fulfilled.type, payload: user});
    expect(fulfilled.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(fulfilled.userInfo).toEqual(user);

    const rejected = userReducer(initialState, {type: checkAuthAction.rejected.type});
    expect(rejected.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(rejected.userInfo).toBeNull();
  });

  it('should handle login lifecycle', () => {
    const pending = userReducer(initialState, {type: loginAction.pending.type});
    expect(pending.loginStatus).toBe(RequestStatuses.Loading);
    expect(pending.loginError).toBeNull();

    const fulfilled = userReducer(initialState, {type: loginAction.fulfilled.type, payload: user});
    expect(fulfilled.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(fulfilled.userInfo).toEqual(user);
    expect(fulfilled.loginStatus).toBe(RequestStatuses.Succeeded);
    expect(fulfilled.loginError).toBeNull();

    const errorMessage = 'Invalid credentials';
    const rejected = userReducer(initialState, {
      type: loginAction.rejected.type,
      payload: errorMessage,
      error: {message: 'Error'},
    });
    expect(rejected.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(rejected.userInfo).toBeNull();
    expect(rejected.loginStatus).toBe(RequestStatuses.Failed);
    expect(rejected.loginError).toBe(errorMessage);
  });

  it('should reset authorization state on logout', () => {
    const authorizedState: UserState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: user,
      loginStatus: RequestStatuses.Succeeded,
      loginError: null,
    };

    const result = userReducer(authorizedState, {type: logoutAction.fulfilled.type});

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userInfo).toBeNull();
    expect(result.loginStatus).toBe(RequestStatuses.Idle);
  });
});

describe('userSlice async operations', () => {
  let api: ReturnType<typeof axios.create>;
  let mockAPI: MockAdapter;

  beforeEach(() => {
    api = axios.create();
    mockAPI = new MockAdapter(api);
    mockAPI.reset();
  });

  it('should check auth successfully', async () => {
    const store = configureStore({
      reducer: {user: userReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    mockAPI.onGet('/login').reply(200, user);

    await store.dispatch(checkAuthAction());

    const state = store.getState().user;
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toEqual(user);
  });

  it('should handle login request', async () => {
    const store = configureStore({
      reducer: {user: userReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    mockAPI.onPost('/login').reply(200, user);

    const result = await store.dispatch(loginAction(loginData));

    const state = store.getState().user;
    expect(loginAction.fulfilled.match(result)).toBe(true);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toEqual(user);
  });

  it('should handle login rejection', async () => {
    const store = configureStore({
      reducer: {user: userReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    mockAPI.onPost('/login').reply(400);

    const result = await store.dispatch(loginAction(loginData));

    const state = store.getState().user;
    expect(loginAction.rejected.match(result)).toBe(true);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.loginStatus).toBe(RequestStatuses.Failed);
  });

  it('should handle logout request', async () => {
    const store = configureStore({
      reducer: {user: userReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
      preloadedState: {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: user,
          loginStatus: RequestStatuses.Succeeded,
          loginError: null,
        },
      },
    });

    mockAPI.onDelete('/logout').reply(200);

    await store.dispatch(logoutAction());

    const state = store.getState().user;
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.userInfo).toBeNull();
  });
});
