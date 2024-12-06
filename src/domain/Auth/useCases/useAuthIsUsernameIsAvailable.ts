import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param {
  username: string;
}
export function useAuthIsUsernameIsAvailable({username}: Param) {
  const debounceUserName = useDebounce(username, 5000);

  const {data, isFetching} = useQuery({
    queryKey: [QueryKeys.IsUserNameAvailable, debounceUserName],
    queryFn: () => authService.isUserNameAvailable(debounceUserName),
    retry: false,
    staleTime: 20000,
  });

  return {
    isAvailable: !!data,
    isFetching,
  };
}
