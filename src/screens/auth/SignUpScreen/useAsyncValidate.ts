import {
  SignUpData,
  useAuthIsEmailIsAvailable,
  useAuthIsUsernameIsAvailable,
} from '@domain';
import {UseFormGetFieldState, UseFormWatch} from 'react-hook-form';

type Props = {
  watch: UseFormWatch<SignUpData>;
  getFieldState: UseFormGetFieldState<SignUpData>;
};
type ReturnValues = {
  errorMessage?: string;
  notReady: boolean;
  isFetching: boolean;
};

export function useAsyncValidation({watch, getFieldState}: Props): {
  userNameValidation: ReturnValues;
  emailValidation: ReturnValues;
} {
  const username = watch('username');
  const usernameState = getFieldState('username');
  const usernameIsValid = !usernameState?.invalid && usernameState.isDirty;
  const usernameQuery = useAuthIsUsernameIsAvailable({
    username,
    enabled: usernameIsValid,
  });

  const email = watch('email');
  const emailState = getFieldState('email');
  const emailIsValid = !emailState?.invalid && emailState.isDirty;
  const emailQuery = useAuthIsEmailIsAvailable({
    email,
    enabled: emailIsValid,
  });

  return {
    userNameValidation: {
      errorMessage: usernameQuery.isUnavailable
        ? 'Nome de usuario indisponível'
        : undefined,
      notReady: usernameQuery.isFetching || usernameQuery.isUnavailable,
      isFetching: usernameQuery.isFetching,
    },
    emailValidation: {
      errorMessage: emailQuery.isUnavailable
        ? 'E-mail indisponível'
        : undefined,
      notReady: emailQuery.isFetching || emailQuery.isUnavailable,
      isFetching: emailQuery.isFetching,
    },
  };
}
