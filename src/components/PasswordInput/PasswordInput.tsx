import React, {useState} from 'react';
import {TextInput, TextInputProps} from '../TextInput/TextInput';
import {Icon} from '../Icon/Icon';

type PasswordInputProps = Omit<TextInputProps, 'RightComponent'>;

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecurityTextEntry] = useState(true);

  function toggleSecureTextEntry() {
    setIsSecurityTextEntry(prev => !prev);
  }
  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      RightComponent={
        <Icon
          name={isSecureTextEntry ? 'eyeOn' : 'eyeOff'}
          color="gray2"
          onPress={toggleSecureTextEntry}
        />
      }
    />
  );
}
