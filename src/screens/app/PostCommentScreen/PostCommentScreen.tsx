import React from 'react';

import {Box, Screen, Text} from '@components';
import {AppScreenProps} from '@routes';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const {postId} = route.params;

  return (
    <Screen canGoBack title="Comentário">
      <Box>
        <Text>PostCommentScreen</Text>
      </Box>
    </Screen>
  );
}
