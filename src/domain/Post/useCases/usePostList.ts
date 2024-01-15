import {usePaginatedList} from '@infra';

import {postService} from '../postService';

export function usePostList() {
  return usePaginatedList(postService.getList);
}
