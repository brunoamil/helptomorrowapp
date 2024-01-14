import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, TouchableOpacityBox, Icon, Text} from '@components';

import {ScreenProps} from '../Screen';

type Props = Pick<ScreenProps, 'canGoBack' | 'title'>;

const ICON_SIZE = 20;

export function ScreenHeader({canGoBack, title}: Props) {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s24">
      {canGoBack && (
        <TouchableOpacityBox
          onPress={navigation.goBack}
          flexDirection="row"
          alignItems="center">
          <Icon name="arrowLeft" color="primary" size={ICON_SIZE} />
          {!title && (
            <Text preset="paragraphMedium" semiBold ml="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {title && <Text>{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  );
}
