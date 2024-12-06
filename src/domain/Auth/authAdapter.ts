import {userAdapter} from '../User/userAdapter';

import {AuthCredentials, AuthCredentialsAPI} from './authTypes';

function toAuthCredentials(
  authCredentialsAPI: AuthCredentialsAPI,
): AuthCredentials {
  return {
    token: authCredentialsAPI.auth.token,
    user: userAdapter.toUser(authCredentialsAPI.user),
    tokenExpiresAt: authCredentialsAPI.auth.expires_at,
    refreshToken: authCredentialsAPI.auth.refreshToken,
  };
}

export const authAdapter = {
  toAuthCredentials,
};
