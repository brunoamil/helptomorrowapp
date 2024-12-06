import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param {
  username: string;
  enabled: boolean;
}
export function useAuthIsUsernameIsAvailable({username, enabled}: Param) {
  const debounceUserName = useDebounce(username, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [QueryKeys.IsUserNameAvailable, debounceUserName],
    queryFn: () => authService.isUserNameAvailable(debounceUserName),
    retry: false,
    staleTime: 200,
    enabled: enabled && debounceUserName.length > 0,
  });

  const isDebouncing = debounceUserName !== username;

  return {
    // isAvailable: !!data,
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  };
}
