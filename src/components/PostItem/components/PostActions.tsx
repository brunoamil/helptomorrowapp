import React from 'react';

import {Post} from '@domain';

import {Box, Icon, IconProps, Text, TouchableOpacityBox} from '@components';

type Props = Pick<Post, 'reactionCount' | 'favoriteCount' | 'commentCount'>;

export function PostActions({
  reactionCount,
  commentCount,
  favoriteCount,
}: Props) {
  function likePost() {
    //TODO: Implementar
  }

  function navigateToComment() {
    //TODO: Implementar
  }

  function favoritePost() {
    //TODO: Implementar
  }

  return (
    <Box flexDirection="row" mt="s16">
      <Item
        onPress={likePost}
        icon={{default: 'heart', marked: 'heartFill'}}
        text={reactionCount}
        marked
      />
      <Item
        onPress={navigateToComment}
        icon={{default: 'comment', marked: 'comment'}}
        text={commentCount}
        marked={false}
      />
      <Item
        onPress={favoritePost}
        icon={{default: 'bookmark', marked: 'bookmarkFill'}}
        text={favoriteCount}
        marked={false}
      />
    </Box>
  );
}

interface ItemProps {
  onPress: () => void;
  icon: {
    default: IconProps['name'];
    marked: IconProps['name'];
  };
  text: number;
  marked: boolean;
}
function Item({icon, onPress, marked, text}: ItemProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
      mr="s24"
      onPress={onPress}>
      <Icon
        name={marked ? icon.marked : icon.default}
        color={marked ? 'market' : undefined}
      />
      {text > 0 && (
        <Text ml="s4" bold preset="paragraphSmall">
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
