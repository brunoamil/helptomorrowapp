// import {UseFormGetFieldState, UseFormWatch} from 'react-hook-form';

// import {
//   useAuthIsEmailIsAvailable,
//   useAuthIsUsernameIsAvailable,
// } from '../../../domain/Auth/useCases/useAuthIsUsernameIsAvailable_deprecated';

// import {SignUpSchema} from './signUpSchema';

// type Props = {
//   watch: UseFormWatch<SignUpSchema>;
//   getFieldState: UseFormGetFieldState<SignUpSchema>;
// };
// type ReturnValue = {
//   errorMessage?: string;
//   notReady: boolean;
//   isFetching: boolean;
// };
// export function useAsyncValidation_deprecated({watch, getFieldState}: Props): {
//   usernameValidation: ReturnValue;
//   userEmailValidation: ReturnValue;
// } {
//   const userName = watch('username');
//   const usernameState = getFieldState('username');
//   const usernameIsValid = !usernameState.invalid && usernameState.isDirty;
//   const usernameQuery = useAuthIsUsernameIsAvailable({
//     username: userName,
//     enabled: usernameIsValid,
//   });

//   const email = watch('email');
//   const emailState = getFieldState('email');
//   const emailIsValid = !emailState.invalid && emailState.isDirty;
//   const emailQuery = useAuthIsEmailIsAvailable({
//     email: email,
//     enabled: emailIsValid,
//   });

//   return {
//     usernameValidation: {
//       errorMessage: usernameQuery.isUnavailable
//         ? 'Username não está disponivel'
//         : undefined,
//       notReady: usernameQuery.isFetching || usernameQuery.isUnavailable,
//       isFetching: usernameQuery.isFetching,
//     },
//     userEmailValidation: {
//       errorMessage: emailQuery.isUnavailable
//         ? 'Username não está disponivel'
//         : undefined,
//       notReady: emailQuery.isFetching || emailQuery.isUnavailable,
//       isFetching: emailQuery.isFetching,
//     },
//   };
// }
