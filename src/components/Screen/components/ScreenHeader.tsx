import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Text} from '../../Text/Text';
import {Icon} from '../../Icon/Icon';
import {ScreenProps} from '../../Screen/Screen';
import {Box, BoxProps, TouchableOpacityBox} from '../../Box/Box';

const ICON_SIZE = 20;
type Props = Pick<ScreenProps, 'canGoBack' | 'title' | 'HeaderComponent'> &
  BoxProps;
export function ScreenHeader({
  title,
  canGoBack,
  HeaderComponent,
  ...boxProps
}: Props) {
  const navigation = useNavigation();

  if (!title && !canGoBack && !HeaderComponent) {
    return null;
  }
  const showBackLabel = !title && !HeaderComponent;

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s24"
      {...boxProps}>
      {canGoBack && (
        <TouchableOpacityBox
          testID="screen-back-button"
          flexDirection="row"
          alignItems="center"
          mr={showBackLabel ? 's10' : undefined}
          onPress={navigation.goBack}>
          <Icon name="arrowLeft" color="primary" />
          {showBackLabel && (
            <Text preset="paragraphMedium" semiBold ml="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {HeaderComponent}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} backgroundColor="carrotSecondary" />}
    </Box>
  );
}
