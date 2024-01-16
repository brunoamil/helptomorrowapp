import React from 'react';
import {Alert, Pressable} from 'react-native';

import {PostComment, postCommentService, usePostCommentRemove} from '@domain';
import {useToastService} from '@services';

import {Box, ProfileAvatar, Text} from '@components';

interface Props {
  postComment: PostComment;
  onRemoveComment: () => void;
  postAuthorId: number;
  userId: number;
}
export function PostCommentItem({
  postComment,
  onRemoveComment,
  postAuthorId,
  userId,
}: Props) {
  const {showToast} = useToastService();
  const {mutate} = usePostCommentRemove({
    onSucess: () => {
      onRemoveComment();
      showToast({
        message: 'Comentário excluído com sucesso',
        position: 'bottom',
      });
    },
  });

  const isAllowToDelete = postCommentService.isAllowToDelete(
    postComment,
    userId,
    postAuthorId,
  );
  function confirmRemove() {
    Alert.alert('Deseja excluir o comentário?', 'pressione confirmar', [
      {
        text: 'Confirmar',
        onPress: () => {
          mutate(postComment.id);
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }
  return (
    <Pressable onPress={confirmRemove} disabled={!isAllowToDelete}>
      <Box flexDirection="row" alignItems="center" mb="s16">
        <ProfileAvatar imagemURL={postComment.author.profileURL} />
        <Box ml="s12" flex={1}>
          <Text preset="paragraphSmall" bold>
            {postComment.author.userName}
          </Text>
          <Text preset="paragraphSmall" color="gray1">
            {postComment.message} - {postComment.createdRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
