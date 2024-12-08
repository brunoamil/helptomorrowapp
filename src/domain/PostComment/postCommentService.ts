import {apiAdapter} from '@api';
import {Page} from '@types';

import {postCommentAdapter} from './postCommentAdapter';
import {postCommentApi} from './postCommentApi';
import {PostComment} from './postCommentTypes';

const PER_PAGE = 10;
async function getList(
  postId: number,
  page: number,
): Promise<Page<PostComment>> {
  const postCommentAPI = await postCommentApi.getList(postId, {
    page,
    per_page: PER_PAGE,
  });

  return {
    data: postCommentAPI.data.map(postCommentAdapter.toPostComment),
    meta: apiAdapter.toMetaDataPage(postCommentAPI.meta),
  };
}

async function create(postId: number, message: string) {
  const postCommentAPI = await postCommentApi.create(postId, message);

  return postCommentAdapter.toPostComment(postCommentAPI);
}

async function remove(postCommentId: number): Promise<string> {
  const response = await postCommentApi.remove(postCommentId);
  return response.message;
}

/**
 * @description usuario pode deletar o comentario se for de mesmo autor.
 */

function isAllowToTdelete(
  postComment: PostComment,
  userId: number | null,
  postAuthorId: number,
): boolean {
  if (postComment.author.id === userId) {
    return true;
  }
  if (postAuthorId === userId) {
    return true;
  }

  return false;
}

export const postCommentService = {
  getList,
  create,
  remove,
  isAllowToTdelete,
};
