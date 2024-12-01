import React, {useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import {useAppTheme} from '@hooks';

import {Box} from '../Box/Box';
import {Text} from '../Text/Text';
import {$textInputStyle} from '../TextInput/TextInput';

interface TextMessageProps extends RNTextInputProps {
  onPressSend: () => void;
}
export function TextMessage({
  onPressSend,
  value,
  ...rnTextInputProps
}: TextMessageProps) {
  const {colors} = useAppTheme();

  const inputRef = useRef<RNTextInput>(null);
  function focusInput() {
    inputRef.current?.focus();
  }
  const sendIsDisable = value?.trim().length === 0;
  return (
    <Pressable onPressIn={focusInput}>
      <Box
        paddingHorizontal="s16"
        paddingVertical="s14"
        backgroundColor="gray5"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="s12"
        style={[$textInputStyle, {color: colors.gray1}]}>
        <RNTextInput
          ref={inputRef}
          value={value}
          placeholderTextColor={colors.gray2}
          placeholder="Adicione um comentário"
          {...rnTextInputProps}
        />
        <Pressable disabled={sendIsDisable} onPress={onPressSend}>
          <Text color={sendIsDisable ? 'gray2' : 'primary'} bold>
            Enviar
          </Text>
        </Pressable>
      </Box>
    </Pressable>
  );
}
