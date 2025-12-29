import {RootState} from '../index.ts';

export const selectUserState = (state: RootState) => state.user;
export const selectAuthorizationStatus = (state: RootState) => selectUserState(state).authorizationStatus;
export const selectUserInfo = (state: RootState) => selectUserState(state).userInfo;
