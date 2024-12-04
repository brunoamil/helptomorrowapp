import {postService} from '@domain';
import {QueryKeys, usePaginatedListRQ} from '@infra';

export function usePostList() {
  return usePaginatedListRQ([QueryKeys.PostList], postService.getList);
}
