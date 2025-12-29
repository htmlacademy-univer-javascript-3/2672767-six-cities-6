import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthorizationStatus} from '../../const/auth.ts';
import {LoginData, UserFull} from '../../types/user.ts';
import {dropToken, saveToken} from '../../services/token.ts';

export interface UserState {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserFull | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const checkAuthAction = createAsyncThunk<UserFull, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserFull>('/login');
    return data;
  }
);

export const loginAction = createAsyncThunk<UserFull, LoginData, { extra: AxiosInstance }>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<UserFull>('/login', {email, password});
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete('/logout');
    dropToken();
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
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
        dropToken();
      });
  },
});

export const userReducer = userSlice.reducer;
