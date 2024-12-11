import {QueryKeys, usePaginatedListRQ} from '@infra';

import {userService} from '../userService';

export function useUserSearch(search: string) {
  return usePaginatedListRQ(
    [QueryKeys.UserList, search],
    () => userService.searchUser(search),
    {
      enabled: search.length > 0,
      staleTime: 30000,
    },
  );
}
