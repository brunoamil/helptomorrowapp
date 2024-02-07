import {QueryKeys} from '@infra';
import {useQuery} from 'react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param<T extends {length: number}> {
  value: T;
  enabled: boolean;
  queryKey: QueryKeys;
  isAvailableFunc: (value: T) => Promise<boolean>;
}

function useAuthIsValueAvailable<T extends {length: number}>({
  value,
  enabled,
  queryKey,
  isAvailableFunc,
}: Param<T>) {
  const debouncedValue = useDebounce(value, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => isAvailableFunc(debouncedValue),
    retry: false,
    staleTime: 20000,
    enabled: enabled && debouncedValue.length > 0,
  });

  const isDebouncing = debouncedValue !== value;

  return {
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  };
}

export function useAuthIsUsernameIsAvailable({
  username,
  enabled,
}: {
  username: string;
  enabled: boolean;
}) {
  return useAuthIsValueAvailable({
    value: username,
    enabled,
    isAvailableFunc: authService.isUserNameAvailable,
    queryKey: QueryKeys.IsUserNameAvailable,
  });
}

export function useAuthIsEmailIsAvailable({
  email,
  enabled,
}: {
  email: string;
  enabled: boolean;
}) {
  return useAuthIsValueAvailable({
    value: email,
    enabled,
    isAvailableFunc: authService.isEmailAvailable,
    queryKey: QueryKeys.IsEmailAvaiable,
  });
}

// Example use without hook personalization
// export function useAuthIsUsernameIsAvailable({username, enabled}: Param) {
//   const debounceUsername = useDebounce(username, 1500);

//   const {data, isFetching} = useQuery({
//     queryKey: [QueryKeys.IsUserNameAvailable, debounceUsername],
//     queryFn: () => authService.isUserNameAvailable(debounceUsername),
//     retry: false,
//     staleTime: 20000,
//     enabled: enabled && debounceUsername.length > 0,
//   });

//   const isDebouncing = debounceUsername !== username;

//   return {
//     isUnavailable: data === false,
//     isFetching: isFetching || isDebouncing,
//   };
// }
