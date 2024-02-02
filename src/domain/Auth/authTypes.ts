import {User, UserAPI} from '../User';

export interface AuthCredentials {
  token: string;
  user: User;
}

export interface AuthCredentialsAPI {
  auth: {
    type: string; // 'Bearer'
    token: string; // 'Token ----'
  };
  user: UserAPI;
}

export interface SignInData {
  username?: string;
  email?: string;
  password?: string;
}
