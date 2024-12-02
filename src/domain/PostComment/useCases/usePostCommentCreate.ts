import {MutationOptions, useMutation} from '@infra';

import {postCommentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  const {mutate, error, loading} = useMutation<{message: string}, PostComment>(
    ({message}) => postCommentService.create(postId, message),
    options,
  );

  async function createComponent(message: string) {
    await mutate({message});
  }

  return {
    createComment: createComponent,
    loading,
    error,
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
