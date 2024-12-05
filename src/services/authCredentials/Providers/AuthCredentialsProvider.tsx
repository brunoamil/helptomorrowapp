import React from 'react';
import {createContext, useState} from 'react';

import {AuthCredentials} from '@domain';

import {AuthCredentialsService} from '../authCredentialsTypes';

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: true,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});

export function AuthCredentialsProvider({children}: React.PropsWithChildren) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setLoading] = useState(true);

  async function saveCredentials(ac: AuthCredentials): Promise<void> {
    setAuthCredentials(ac);
  }

  async function removeCredentials(): Promise<void> {
    setAuthCredentials(null);
  }
  return (
    <AuthCredentialsContext.Provider
      value={{authCredentials, isLoading, saveCredentials, removeCredentials}}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
