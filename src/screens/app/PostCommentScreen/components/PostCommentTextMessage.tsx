import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {usePostCommentCreate} from '@domain';

import {TextMessage} from '@components';

interface Props {
  postId: number;
  onAddComment: () => void;
}
export function PostCommentTextMessage({postId, onAddComment}: Props) {
  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
      onAddComment();
      setMessage('');
      Keyboard.dismiss();
    },
  });

  const [message, setMessage] = useState('');

  return (
    <TextMessage
      onPressSend={createComment}
      placeholder="Adicione um comentário"
      value={message}
      onChangeText={setMessage}
    />
  );
}
