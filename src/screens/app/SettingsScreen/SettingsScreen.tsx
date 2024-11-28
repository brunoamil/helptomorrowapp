import React from 'react';

import {Button, Screen, Text} from '@components';
import {AppScreenProps} from '@routes';

// type ScreenProps = NativeStackScreenProps<AppStackParamList, 'SettingsScreen'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsScreen({navigation}: AppScreenProps<'SettingsScreen'>) {
  return (
    <Screen canGoBack>
      <Text>Setting Screen</Text>
      <Button title="Settings" />
    </Screen>
  );
}
