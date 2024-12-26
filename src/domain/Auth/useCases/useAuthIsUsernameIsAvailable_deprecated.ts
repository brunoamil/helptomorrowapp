import {QueryKeys} from '@infra';

interface Param<T extends {length: number}> {
  value: T;
  enabled: boolean;
  queryKey: QueryKeys;
  isAvailableFunc: (value: T) => Promise<boolean>;
}

/**
 * @param param0
 * @deprecated */
// function useAuthIsValueIsAvailable<T extends {length: number}>({
//   value,
//   enabled,
//   isAvailableFunc,
//   queryKey,
// }: Param<T>) {
//   const debouncedValue = useDebounce(value, 1500);

//   const {data, isFetching} = useQuery({
//     queryKey: [queryKey, debouncedValue],
//     queryFn: () => isAvailableFunc(debouncedValue),
//     retry: false,
//     staleTime: 2000,
//     enabled: enabled && debouncedValue.length > 0,
//   });

//   const isDebouncing = debouncedValue !== value;

//   return {
//     // isAvailable: !!data,
//     isUnavailable: data === false,
//     isFetching: isFetching || isDebouncing,
//   };
// }

// export function useAuthIsUsernameIsAvailable({
//   username,
//   enabled,
// }: {
//   username: string;
//   enabled: boolean;
// }) {
//   return useAuthIsValueIsAvailable({
//     value: username,
//     enabled,
//     isAvailableFunc: authService.isUserNameAvailable,
//     queryKey: QueryKeys.IsUsernameAvailable,
//   });
// }

// export function useAuthIsEmailIsAvailable({
//   email,
//   enabled,
// }: {
//   email: string;
//   enabled: boolean;
// }) {
//   return useAuthIsValueIsAvailable({
//     value: email,
//     enabled: enabled,
//     isAvailableFunc: authService.isEmailAvailable,
//     queryKey: QueryKeys.IsEmailAvailable,
//   });
// }

/**
 * @description funcao de forma direta
 */
// interface Param {
//   username: string;
//   enabled: boolean;
// }
// export function useAuthIsUsernameIsAvailable({username, enabled}: Param) {
//   const debounceUserName = useDebounce(username, 1500);

//   const {data, isFetching} = useQuery({
//     queryKey: [QueryKeys.IsUserNameAvailable, debounceUserName],
//     queryFn: () => authService.isUserNameAvailable(debounceUserName),
//     retry: false,
//     staleTime: 200,
//     enabled: enabled && debounceUserName.length > 0,
//   });

//   const isDebouncing = debounceUserName !== username;

//   return {
//     // isAvailable: !!data,
//     isUnavailable: data === false,
//     isFetching: isFetching || isDebouncing,
//   };
// }
