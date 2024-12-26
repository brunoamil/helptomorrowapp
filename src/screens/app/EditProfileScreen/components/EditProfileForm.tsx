import React, {forwardRef, useEffect, useImperativeHandle} from 'react';

import {authService, User, useUserUpdate} from '@domain';
import {useAsyncValidation} from '@form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import {ActivityIndicator, Box, FormTextInput} from '@components';

import {editProfileSchema, EditProfileSchema} from '../editProfileSchema';

type Props = {
  user: User;
  onChangeIsValid: (isValid: boolean) => void;
  onChangeIsLoading: (isLoading: boolean) => void;
};

export type EditProfileFormRef = {
  onSubmit: () => void;
};
export function EditProfileFormComponent(
  {user, onChangeIsValid, onChangeIsLoading}: Props,
  ref: React.Ref<EditProfileFormRef>,
) {
  const navigation = useNavigation();
  const {isLoading, updateUser} = useUserUpdate({
    onSuccess: () => {
      navigation.goBack();
    },
  });
  const {control, watch, getFieldState, formState, handleSubmit} =
    useForm<EditProfileSchema>({
      resolver: zodResolver(editProfileSchema),
      defaultValues: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      mode: 'onChange',
    });

  const usernameValidation = useAsyncValidation({
    watch,
    getFieldState,
    fieldName: 'username',
    errorMessage: 'Username indisponível',
    isAvailableFunc: authService.isUserNameAvailable,
  });

  useEffect(() => {
    onChangeIsValid(formState.isValid && !usernameValidation.notReady);
  }, [formState.isValid, usernameValidation.notReady, onChangeIsValid]);

  useEffect(() => {
    onChangeIsLoading(isLoading);
  }, [isLoading, onChangeIsLoading]);

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      handleSubmit(formValues => updateUser(formValues))();
    },
  }));

  return (
    <Box>
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
    </Box>
  );
}

export const EditProfileForm = forwardRef(EditProfileFormComponent);
