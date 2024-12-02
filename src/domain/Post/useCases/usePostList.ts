import {postService} from '@domain';
import {usePaginatedList} from '@infra';

export function usePostList() {
  return usePaginatedList(postService.getList);
}
