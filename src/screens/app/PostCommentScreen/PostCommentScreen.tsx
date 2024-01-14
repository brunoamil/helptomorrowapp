import React from 'react';

// import {usePaginatedList} from '@domain';
import {usePostCommentList} from 'src/domain/PostComment/useCases/usePostCommentList';

import {Box, Screen, Text} from '@components';
import {AppScreenProps} from '@routes';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const {postId} = route.params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {list} = usePostCommentList(postId);

  return (
    <Screen canGoBack title="Comentário">
      <Box>
        <Text>PostCommentScreen</Text>
      </Box>
    </Screen>
  );
}
