import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {postCommentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  const queryClient = useQueryClient();
  const {mutate, isError, isLoading} = useMutation<
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

      if (options?.onSuccess) {
        options.onSuccess(data);
      }

      if (options?.onError) {
        options.onError(options.errorMessage || 'Ocorreu um erro');
      }
    },
  });
  async function createComponent(message: string) {
    mutate({message});
  }

  return {
    createComment: createComponent,
    isError,
    isLoading,
  };
}

/**
 * @deprecated código depreciado
 */
//   interface Options {
//     onSuccess?: (data: PostComment) => void;
//     onError?: (message: string) => void;
//   }
//    function usePostCommentCreate_DEPRECATED(
//     postId: number,
//     options?: Options,
//   ) {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<boolean | null>(null);

//     console.log('postId', postId);
//     async function createComment(message: string) {
//       console.log('message', message);

//       try {
//         setLoading(true);
//         const postComment = await postCommentService.create(postId, message);
//         if (options?.onSuccess) {
//           options.onSuccess(postComment);
//         }
//       } catch (e) {
//         setError(true);
//         if (options?.onError) {
//           options.onError('Erro ao adicionar comentário');
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//     return {
//       createComment,
//       loading,
//       error,
//     };
//   }
// }
