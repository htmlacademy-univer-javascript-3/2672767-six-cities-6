export interface UserCommon {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface UserAuth {
  email: string;
  token: string;
}

export type UserFull = UserCommon & UserAuth;

export interface LoginData {
  email: string;
  password: string;
}
