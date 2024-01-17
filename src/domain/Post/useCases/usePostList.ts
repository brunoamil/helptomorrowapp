import {QueryKeys, usePaginatedListRQ} from '@infra';

import {postService} from '../postService';

export function usePostList() {
  return usePaginatedListRQ([QueryKeys.PostList], postService.getList);
}
