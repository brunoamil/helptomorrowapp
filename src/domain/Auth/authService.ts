import {api} from '../../api/apiConfig';

import {authAdapter} from './authAdapter';
import {authApi} from './authApi';
import {AuthCredentials, EditPasswordParams, SignUpData} from './authTypes';

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

async function signUp(signUpData: SignUpData): Promise<void> {
  await authApi.signUp(signUpData);
}
function updateToken(token: string) {
  return (api.defaults.headers.common.Authorization = `Bearer ${token}`);
}

function removeToken() {
  return (api.defaults.headers.common.Authorization = null);
}

async function isUserNameAvailable(username: string): Promise<boolean> {
  const {isAvailable} = await authApi.isUserNameAvailable({username});
  return isAvailable;
}
async function isEmailAvailable(email: string): Promise<boolean> {
  const {isAvailable} = await authApi.isEmailAvailable({email});
  return isAvailable;
}

// async function requestNewPassword(email: string): Promise<string> {
//   const {message} = await authApi.forgotPassword({params: {email}});
//   return message;
// }

async function requestNewPassword(email: string): Promise<string> {
  const {message} = await authApi.forgotPassword({email});
  return message;
}

async function updatePassword(params: EditPasswordParams): Promise<string> {
  const {message} = await authApi.editPassword(params);
  return message;
}

async function authenticateByRefreshToken(
  refreshToken: string,
): Promise<AuthCredentials> {
  const acAPI = await authApi.refreshToken(refreshToken);
  return authAdapter.toAuthCredentials(acAPI);
}
export const authService = {
  signIn,
  signOut,
  signUp,
  updateToken,
  removeToken,
  isUserNameAvailable,
  isEmailAvailable,
  requestNewPassword,
  authenticateByRefreshToken,
  updatePassword,
  isRefreshTokenRequest: authApi.isRefreshTokenRequest,
};
