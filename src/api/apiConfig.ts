import {AuthCredentials, authService} from '@domain';
import axios from 'axios';

export const BASE_URL = 'http://localhost:3333/';
export const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization:
  //     'Bearer MQ.1QdZ5zs-bM6ctmN9wHDQzr74zuD6E8qrWlCNoBaKsgpX3S6NjTJawj2bEzFc',
  // },
});

type InterceptorProps = {
  authCredentials: AuthCredentials | null;
  removeCredentials: () => Promise<void>;
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
};
export function registerInterceptor({
  authCredentials,
  removeCredentials,
  saveCredentials,
}: InterceptorProps) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async responseError => {
      const failedRequest = responseError.config;
      const hasNotRefreshToken = !authCredentials?.refreshToken;
      const isRefreshTokenRequest =
        authService.isRefreshTokenRequest(failedRequest);

      if (responseError.response.status === 401) {
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
  //remove listen quando o componente é desmontado
  return () => api.interceptors.response.eject(interceptor);
}
