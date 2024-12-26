import React from 'react';

import {authService, useAuthSignUp} from '@domain';
import {useAsyncValidation} from '@form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
  ActivityIndicator,
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {useResetNavigationSuccess} from '@hooks';
import {AuthScreenProps, AuthStackParamList} from '@routes';

import {SignUpSchema, signUpSchema} from './signUpSchema';

const resetParams: AuthStackParamList['SuccessScreen'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: {
    name: 'checkRound',
    color: 'success',
  },
};

const defaultValues: SignUpSchema = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SignUpScreen({navigation}: AuthScreenProps<'SignUpScreen'>) {
  const {reset} = useResetNavigationSuccess();
  const {signUp, isLoading} = useAuthSignUp({
    onSuccess: () => {
      reset(resetParams);
    },
  });

  const {control, formState, handleSubmit, watch, getFieldState} =
    useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
      defaultValues: defaultValues,
      mode: 'onChange',
    });

  function submitForm(formValues: SignUpSchema) {
    signUp(formValues);
  }

  // const {userEmailValidation, usernameValidation} = useAsyncValidation({
  //   watch,
  //   getFieldState,
  // });
  const usernameValidation = useAsyncValidation({
    watch,
    getFieldState,
    fieldName: 'username',
    errorMessage: 'Username indisponível',
    isAvailableFunc: authService.isUserNameAvailable,
  });

  const userEmailValidation = useAsyncValidation({
    watch,
    getFieldState,
    fieldName: 'email',
    errorMessage: 'E-mail indisponível',
    isAvailableFunc: authService.isEmailAvailable,
  });

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s32">
        Criar uma conta
      </Text>
      <FormTextInput
        control={control}
        name="username"
        label="Seu username"
        errorMessage={usernameValidation.errorMessage}
        placeholder="@"
        boxProps={{mb: 's20'}}
        RightComponent={
          usernameValidation.isFetching ? (
            <ActivityIndicator size="small" color="primary" />
          ) : undefined
        }
      />

      <FormTextInput
        control={control}
        name="firstName"
        label="Nome"
        placeholder="Digite seu nome"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        control={control}
        name="lastName"
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's20'}}
        errorMessage={userEmailValidation.errorMessage}
        RightComponent={
          userEmailValidation.isFetching ? (
            <ActivityIndicator size="small" color="primary" />
          ) : undefined
        }
      />

      <FormPasswordInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{mb: 's48'}}
      />

      <Button
        loading={isLoading}
        disabled={
          !formState.isValid ||
          userEmailValidation.notReady ||
          usernameValidation.notReady
        }
        title="Criar uma conta"
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
