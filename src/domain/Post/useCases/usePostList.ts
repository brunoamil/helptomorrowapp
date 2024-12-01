import {postService, usePaginatedList} from '@domain';

export function usePostList() {
  return usePaginatedList(postService.getList);
}
