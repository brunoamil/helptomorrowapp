import React from 'react';

import {Post, useReactToPost} from '@domain';

import {Box, Icon, IconProps, Text, TouchableOpacityBox} from '@components';

type Props = {
  post: Post;
  hideCommentAction?: boolean;
};

export function PostActions({
  post,
  hideCommentAction
}: Props) {
  const likeReaction = useReactToPost({post, postReactionType: 'like'});
  const favoriteReaction = useReactToPost({post, postReactionType: 'favorite'});

  function likePost() {}
  function navigateToComment() {}
  function favoritePost() {}

  return (
    <Box flexDirection="row" mt="s16">
      <Item
        marked={likeReaction.hasReacted}
        onPress={likePost}
        icon={{default: 'heart', marked: 'heartFill'}}
        text={post.reactionCount}
      />
      <Item
        disabled={hideCommentAction}
        marked={false}
        onPress={navigateToComment}
        icon={{default: 'comment', marked: 'comment'}}
        text={post.commentCount}
      />
      <Item
       marked={favoriteReaction.hasReacted}
        onPress={favoritePost}
        icon={{default: 'bookmark', marked: 'bookmarkFill'}}
        text={post.favoriteCount}
      />
    </Box>
  );
}

interface ItemProps {
  marked: boolean;
  onPress: () => void;
  icon: {
    default: IconProps['name'];
    marked: IconProps['name'];
  };
  text: number;
  disabled?: boolean;
}
function Item({marked, onPress, icon, text, disabled}: ItemProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      disabled={disabled}
      alignItems="center"
      mr="s24"
      onPress={onPress}>
      <Icon
        name={marked ? icon.marked : icon.default}
        color={marked ? 'market' : undefined}
      />
      {text > 0 && (
        <Text ml="s4" preset="paragraphSmall" bold>
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
