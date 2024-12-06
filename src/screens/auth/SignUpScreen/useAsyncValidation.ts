import {useAuthIsUsernameIsAvailable} from '@domain';
import {UseFormGetFieldState, UseFormWatch} from 'react-hook-form';

import {SignUpSchema} from './signUpSchema';

type Props = {
  watch: UseFormWatch<SignUpSchema>;
  getFieldState: UseFormGetFieldState<SignUpSchema>;
};
export function useAsyncValidation({watch, getFieldState}: Props) {
  const userName = watch('username');
  const usernameState = getFieldState('username');
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty;
  const usernameQuery = useAuthIsUsernameIsAvailable({
    username: userName,
    enabled: usernameIsValid,
  });

  return {
    errorMessage: usernameQuery.isUnavailable
      ? 'Username não está disponivel'
      : undefined,
    notReady: usernameQuery.isFetching || usernameQuery.isUnavailable,
    isFetching: usernameQuery.isFetching,
  };
}
