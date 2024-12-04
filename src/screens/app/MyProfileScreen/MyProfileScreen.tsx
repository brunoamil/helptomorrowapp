import React from 'react';

import {Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function MyProfileScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AppTabScreenProps<'MyProfileScreen'>) {
  return (
    <Screen canGoBack>
      <Text>MyProfileScreen</Text>
    </Screen>
  );
}
