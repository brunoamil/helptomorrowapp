import React from 'react';
import {Linking, Platform} from 'react-native';

import {PermissionName, usePermission} from '@services';

import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';
import {Box} from '../Box/Box';
import {Button} from '../Button/Button';
import {Screen} from '../Screen/Screen';
import {Text} from '../Text/Text';

interface PermissionManagerProps {
  permissionName: PermissionName;
  description: string;
  children: React.ReactElement;
}
export function PermissionManager({
  permissionName,
  description,
  children,
}: PermissionManagerProps) {
  const {status, isLoading} = usePermission(permissionName);

  if (status === 'granted') {
    return children;
  }

  return (
    <Screen flex={1} justifyContent="center" alignItems="center">
      <Text preset="headingSmall" textAlign="center">
        {description}
      </Text>
      {isLoading && <ActivityIndicator color="primary" />}
      {status === 'never_ask_again' && (
        <Box>
          {Platform.OS === 'android' && (
            <Text
              preset="paragraphMedium"
              marginVertical="s16"
              textAlign="center">
              É necessário fechar o app novamente após alterar as configurações.
            </Text>
          )}
          <Button
            title="Abrir configurações"
            onPress={Linking.openSettings}
            mt="s16"
          />
        </Box>
      )}
    </Screen>
  );
}
