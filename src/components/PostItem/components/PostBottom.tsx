import React from 'react';

import {Post} from '@domain';

import {useAppNavigation} from '@hooks';

import {Box} from '../../Box/Box';
import {Text} from '../../Text/Text';

type Props = Pick<Post, 'author' | 'text' | 'commentCount' | 'id'> & {
  hideCommentAction?: boolean;
};
export function PostBottom({
  author,
  text,
  commentCount,
  id,
  hideCommentAction,
}: Props) {
  const commentText = hideCommentAction ? null : getCommentText(commentCount);
  const navigate = useAppNavigation();

  function navigateToPostCommentScreen() {
    navigate.toPostComment({
      postId: id,
      postAuthorId: author.id,
    });
  }
  return (
    <Box mt="s16">
      <Text preset="paragraphMedium" bold>
        {author?.userName}
      </Text>
      <Text preset="paragraphMedium" color="gray1" mb="s8">
        {text}
      </Text>
      {commentText && (
        <Text
          preset="paragraphSmall"
          bold
          color="primary"
          onPress={navigateToPostCommentScreen}>
          {commentText}
        </Text>
      )}
    </Box>
  );
}

function getCommentText(commentCount: number): string | null {
  if (commentCount === 0) {
    return null;
  } else if (commentCount === 1) {
    return 'ver comentário';
  } else {
    return `ver ${commentCount} comentários`;
  }
}
