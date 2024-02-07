import {QueryKeys} from '@infra';
import {useQuery} from 'react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param {
  username: string;
  enabled: boolean;
}
export function useAuthIsUsernameIsAvailable({username, enabled}: Param) {
  const debounceUsername = useDebounce(username, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [QueryKeys.IsUserNameAvailable, debounceUsername],
    queryFn: () => authService.isUserNameAvailable(debounceUsername),
    retry: false,
    staleTime: 20000,
    enabled: enabled && debounceUsername.length > 0,
  });

  const isDebouncing = debounceUsername !== username;

  return {
    isAvailable: !!data,
    isFetching: isFetching || isDebouncing,
  };
}
