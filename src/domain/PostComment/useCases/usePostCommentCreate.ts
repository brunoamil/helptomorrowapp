import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from 'react-query';

import {postCommentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  //Use Mutation Legacy
  // const {mutate, loading, error} = useMutation<{message: string}, PostComment>(
  //   ({message}) => postCommentService.create(postId, message),
  //   options,
  // );

  const queryClient = useQueryClient();
  const {mutate, isLoading, isError} = useMutation<
    PostComment,
    unknown,
    {message: string}
  >({
    mutationFn: variables =>
      postCommentService.create(postId, variables.message),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId],
      });
      if (options?.onSucess) {
        options.onSucess(data);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(
          options.errorMessage || 'ocorreu um erro ao criar o comentário',
        );
      }
    },
  });

  async function createComment(message: string) {
    await mutate({message});
  }

  return {
    createComment,
    isLoading,
    isError,
  };
}
