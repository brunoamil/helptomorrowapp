import {api} from '@api';

import {authAdapter} from './authAdapter';
import {authApi} from './authApi';

async function signIn(email: string, password: string) {
  try {
    const authCredentialsAPI = await authApi.signIn(email, password);
    return authAdapter.toAuthCredentials(authCredentialsAPI);
  } catch {
    throw new Error('E-mail ou senha inválido');
  }
}

async function signOut(): Promise<string> {
  const message = await authApi.signOut();
  return message;
}

function updateToken(token: string) {
  return (api.defaults.headers.common.Authorization = `Bearer ${token}`);
}

function removeToken() {
  return (api.defaults.headers.common.Authorization = null);
}
export const authService = {
  signIn,
  signOut,
  updateToken,
  removeToken,
};
