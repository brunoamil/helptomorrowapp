import {useState} from 'react';

import {postCommentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

interface Options {
  onSuccess?: (data: PostComment) => void;
  onError?: (message: string) => void;
}
export function usePostCommentCreate(postId: number, options?: Options) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);

  console.log('postId', postId);
  async function createComment(message: string) {
    console.log('message', message);

    try {
      setLoading(true);
      const postComment = await postCommentService.create(postId, message);
      if (options?.onSuccess) {
        options.onSuccess(postComment);
      }
    } catch (e) {
      setError(true);
      if (options?.onError) {
        options.onError('Erro ao adicionar comentário');
      }
    } finally {
      setLoading(false);
    }
  }
  return {
    createComment,
    loading,
    error,
  };
}
