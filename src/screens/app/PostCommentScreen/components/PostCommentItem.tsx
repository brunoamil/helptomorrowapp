import React from 'react';
import {Alert, Pressable} from 'react-native';

import {PostComment, postCommentService, usePostCommentRemove} from '@domain';
import {useToastService} from '@services';

import {Box, ProfileAvatar, Text} from '@components';

interface Props {
  postId: number;
  postComment: PostComment;
  userId: number | null;
  postAuthorId: number;
}
export function PostCommentItem({
  postId,
  postComment,
  userId,
  postAuthorId,
}: Props) {
  const {showToast} = useToastService();
  const {mutate} = usePostCommentRemove(postId, {
    onSuccess: () => {
      showToast({
        message: 'Comentário deletado',
        position: 'bottom',
      });
    },
  });

  const isAllowToDelete = postCommentService.isAllowToTdelete(
    postComment,
    userId,
    postAuthorId,
  );
  function confirmRemove() {
    Alert.alert('Deseja excluir o comentário?', 'pressione confirmar', [
      {
        text: 'Confirmar',
        onPress: () => mutate({postCommentId: postComment.id}),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }

  return (
    <Pressable
      testID="post-comment-id"
      onLongPress={confirmRemove}
      disabled={!isAllowToDelete}>
      <Box
        flexDirection="row"
        alignItems="center"
        mb="s16"
        paddingHorizontal="s24">
        <ProfileAvatar
          imageURL={postComment.author.profileURL}
          authorId={postComment.author.id}
        />
        <Box ml="s12" flex={1}>
          <Text preset="paragraphSmall" bold>
            {postComment.author.userName}
          </Text>
          <Text preset="paragraphSmall" color="paragraph">
            {postComment.message} - {postComment.createdRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
