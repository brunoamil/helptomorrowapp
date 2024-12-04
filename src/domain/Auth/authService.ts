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

export const authService = {
  signIn,
  signOut,
};
