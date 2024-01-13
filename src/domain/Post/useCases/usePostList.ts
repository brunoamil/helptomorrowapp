import {usePaginatedList} from '@domain';

import {postService} from '../postService';

export function usePostList() {
  return usePaginatedList(postService.getList);
}
