import React from 'react';

import {useAuthSignOut} from '@domain';

import {Button, Screen} from '@components';
import {AppScreenProps} from '@routes';

// type ScreenProps = NativeStackScreenProps<AppStackParamList, 'SettingsScreen'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsScreen({navigation}: AppScreenProps<'SettingsScreen'>) {
  const {signOut, isLoading} = useAuthSignOut();
  return (
    <Screen canGoBack title="Configurações">
      <Button loading={isLoading} title="Sair da conta" onPress={signOut} />
    </Screen>
  );
}
