import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {postService} from '../postService';

export function usePostGetById(id: number) {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => postService.getById(id),
    // staleTime: 1000 * 10,
    cacheTime: 1000 * 10,
  });

  return {
    post: data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
