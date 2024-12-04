import {User, UserAPI} from '../User/userTypes';

export interface AuthCredentials {
  token: string;
  user: User;
}

export interface AuthCredentialsAPI {
  auth: {
    type: string; // 'bearer'
    token: string; // 'NA.token'
  };
  user: UserAPI;
}

export interface SignInData {
  username?: string;
  email?: string;
  password: string;
}
