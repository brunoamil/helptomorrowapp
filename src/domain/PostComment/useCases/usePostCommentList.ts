import {QueryKeys, usePaginatedListRQ} from '@infra';

import {postCommentService} from '../postCommentService';

export function usePostCommentList(postId: number) {
  function getList(page: number) {
    return postCommentService.getList(postId, page);
  }
  return usePaginatedListRQ([QueryKeys.PostCommentList, postId], getList);
}
