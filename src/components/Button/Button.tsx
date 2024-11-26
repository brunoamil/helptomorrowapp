import React from 'react';
import {Text} from '../Text/Text';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../../theme/theme';
import {Box, TouchableOpacityBox} from '../Box/Box';
import {ActivityIndicator} from 'react-native';

interface ButtonProps {
  title: string;
  loading?: boolean;
}
export function Button({title, loading}: ButtonProps) {
  const {colors} = useTheme<Theme>();

  return (
    <TouchableOpacityBox
      backgroundColor="background"
      paddingHorizontal="s20"
      borderRadius="s16"
      height={50}
      alignItems="center"
      justifyContent="center">
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{color: 'white'}} preset="paragraphMedium" bold>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
