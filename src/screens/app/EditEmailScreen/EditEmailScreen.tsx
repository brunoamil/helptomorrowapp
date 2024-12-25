import React from 'react';

import {Screen, Text} from '@components';
import {AppScreenProps} from '@routes';

export function EditEmailScreen({}: AppScreenProps<'EditEmailScreen'>) {
  return (
    <Screen canGoBack scrollable title="Editar e-mail">
      <Text preset="headingSmall">Editar e-mail</Text>
    </Screen>
  );
}
