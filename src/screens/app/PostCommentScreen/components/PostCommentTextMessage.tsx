import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {usePostCommentCreate} from '@domain';

import {Box, TextMessage} from '@components';

interface Props {
  postId: number;
}
export function PostCommentTextMessage({postId}: Props) {
  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
      setMessage('');
      Keyboard.dismiss();
    },
  });

  const [message, setMessage] = useState('');

  return (
    <Box paddingHorizontal='s24'>
      <TextMessage
      onPressSend={createComment}
      placeholder="Adicione um comentário"
      value={message}
      onChangeText={setMessage}
    />
    </Box>
  );
}
