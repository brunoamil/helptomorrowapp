import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {userService} from '../userService';

export function useGetByType(id: number) {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => userService.getById(id),
    // staleTime: 1000 * 10,
    cacheTime: 1000 * 10,
  });

  return {
    user: data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
