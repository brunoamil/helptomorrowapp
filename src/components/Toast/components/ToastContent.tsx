import React from 'react';
import {Dimensions} from 'react-native';

import {Toast, ToastType, ToastPosition} from '@services';

import {$shadowProps} from '@theme';

import {Box, BoxProps} from '../../Box/Box';
import {Icon, IconProps} from '../../Icon/Icon';
import {Text} from '../../Text/Text';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

interface Props {
  toast: Toast;
  hideToast: () => void;
}
export function ToastContent({toast, hideToast}: Props) {
  const position: ToastPosition = toast?.position || 'top';
  const type: ToastType = toast?.type || 'success';

  return (
    <Box {...$boxStyle} style={[{[position]: 50}, $shadowProps]}>
      <Icon {...mapTypeToIcon[type]} />
      <Text style={{flexShrink: 1}} ml="s16" preset="paragraphMedium" bold>
        {toast?.message}
      </Text>
      {toast?.action && (
        <Text
          ml="s4"
          mt="s8"
          color="market"
          preset="paragraphMedium"
          bold
          onPress={() => {
            toast?.action?.onPress();
            hideToast();
          }}>
          {toast.action.title}
        </Text>
      )}
    </Box>
  );
}

const mapTypeToIcon: Record<ToastType, IconProps> = {
  success: {
    color: 'success',
    name: 'checkRound',
  },
  error: {
    color: 'error',
    name: 'errorRound',
  },
};

const $boxStyle: BoxProps = {
  backgroundColor: 'background',
  alignItems: 'center',
  padding: 's16',
  borderRadius: 's16',
  flexDirection: 'row',
  opacity: 0.95,
  maxWidth: MAX_WIDTH,
};
