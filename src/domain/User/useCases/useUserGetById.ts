import {QueryKeys} from '@infra';
import {useQuery} from 'react-query';

import {userService} from '../userService';

export function useUserGetById(id: number) {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => userService.getById(id),
    staleTime: 1000 * 10, // 10seconds
  });

  return {
    user: data,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}
