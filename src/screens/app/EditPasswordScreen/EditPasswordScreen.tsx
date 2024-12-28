import React from 'react';

import {useAuthUpdatePassword} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToastService} from '@services';
import {useForm} from 'react-hook-form';

import {Button, FormPasswordInput, Screen} from '@components';
import {AppScreenProps} from '@routes';

import {editPasswordSchema, EditPasswordSchema} from './editPasswordSchema';

export function EditPasswordScreen({
  navigation,
}: AppScreenProps<'EditPasswordScreen'>) {
  const {showToast} = useToastService();
  const {updatedPassword, isLoading} = useAuthUpdatePassword({
    onError: message => {
      showToast({message, type: 'error'});
    },
    onSuccess: () => {
      navigation.goBack();
    },
  });

  const {control, formState, handleSubmit} = useForm<EditPasswordSchema>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });
  return (
    <Screen canGoBack scrollable title="Alterar Senha">
      <FormPasswordInput
        control={control}
        name="currentPassword"
        label="Senha atual"
        placeholder="Digite sua senha atual"
        boxProps={{mb: 's20'}}
      />
      <FormPasswordInput
        control={control}
        name="newPassword"
        label="Nova senha"
        placeholder="Digite sua nova senha"
        boxProps={{mb: 's20'}}
      />
      <FormPasswordInput
        control={control}
        name="confirmPassword"
        label="Confirmar senha"
        placeholder="Confirme sua nova senha"
        boxProps={{mb: 's20'}}
      />
      <Button
        title="Salvar alterações"
        disabled={!formState.isValid}
        loading={isLoading}
        onPress={handleSubmit(updatedPassword)}
        mt="s40"
      />
    </Screen>
  );
}
