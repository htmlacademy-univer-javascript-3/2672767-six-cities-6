import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosInstance} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {AuthorizationStatus} from '../../const/auth.ts';
import {LoginData, UserFull} from '../../types/user.ts';
import {dropToken, saveToken} from '../../services/token.ts';
import {RequestStatuses} from '../../const/api.ts';

export interface UserState {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserFull | null;
  loginStatus: RequestStatuses;
  loginError: string | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  loginStatus: RequestStatuses.Idle,
  loginError: null,
};

export const checkAuthAction = createAsyncThunk<UserFull, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserFull>('/login');
    return data;
  }
);

export const loginAction = createAsyncThunk<UserFull, LoginData, { extra: AxiosInstance; rejectValue: string }>(
  'user/login',
  async ({email, password}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<UserFull>('/login', {email, password});
      saveToken(data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const isBadRequest = error.response?.status === StatusCodes.BAD_REQUEST;
        const message = isBadRequest ? 'Invalid email or password.' : 'Unable to sign in. Please try again later.';
        return rejectWithValue(message);
      }

      return rejectWithValue('Unable to sign in. Please try again later.');
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, {extra: api}) => {
    try {
      await api.delete('/logout');
    } finally {
      dropToken();
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
      })
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = RequestStatuses.Loading;
        state.loginError = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
        state.loginStatus = RequestStatuses.Succeeded;
        state.loginError = null;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
        state.loginStatus = RequestStatuses.Failed;
        state.loginError = action.payload ?? action.error.message ?? 'Unable to sign in. Please try again later.';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
        state.loginStatus = RequestStatuses.Idle;
        state.loginError = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
        state.loginStatus = RequestStatuses.Idle;
        state.loginError = null;
      });
  },
});

export const userReducer = userSlice.reducer;
