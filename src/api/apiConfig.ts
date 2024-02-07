import {AuthCredentials, authService} from '@domain';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  // headers: {
  //   Authorization:
  //     'Bearer MzQ.SO4hWRQKSvFvha2dmOMnUjhz6QfVfPssQvQ3-V6hKpIg6S1sUnDmKkbNtQeO',
  // },
});

type InterceptorProps = {
  authCredentials: AuthCredentials | null;
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
  removeCredentials: () => void;
};
export function registerInterceptor({
  authCredentials,
  saveCredentials,
  removeCredentials,
}: InterceptorProps) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async responseError => {
      const failedRequest = responseError.config;
      const hasNotRefreshToken = !authCredentials?.refreshToken;
      const isRefreshTokenRequest =
        authService.isRefreshTokenRequest(failedRequest);
      const status = responseError.response.status;
      if (status === 401) {
        if (hasNotRefreshToken || isRefreshTokenRequest || failedRequest.sent) {
          removeCredentials();
          return Promise.reject(responseError);
        }
        failedRequest.sent = true;

        const newAuthCredentials = await authService.authenticateByRefreshToken(
          authCredentials.refreshToken,
        );
        saveCredentials(newAuthCredentials);
        failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`;

        return api(failedRequest);
      }
      return Promise.reject(responseError);
    },
  );

  //remove listerner when component unmount
  return () => api.interceptors.response.eject(interceptor);
}
