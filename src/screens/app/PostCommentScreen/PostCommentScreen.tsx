import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {PostComment, usePostCommentList, usePostGetById} from '@domain';
import {useAuthCredentials} from '@services';

import {Box, PostItem, Screen} from '@components';
import {useAppSafeArea} from '@hooks';
import {AppScreenProps} from '@routes';

import {
  PostCommentBottom,
  PostCommentItem,
  PostCommentTextMessage,
} from './components';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const {userId} = useAuthCredentials();
  const {bottom} = useAppSafeArea();
  const postId = route.params.postId;
  const postAuthorId = route.params.postAuthorId;
  const showPost = route.params.showPost || false;

  const {list, fetchNextPage, hasNextPage} = usePostCommentList(postId);
  const {post} = usePostGetById(postId, showPost);
  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postId={postId}
        postComment={item}
        userId={userId}
        postAuthorId={postAuthorId}
      />
    );
  }

  return (
    <Screen
      noPaddingHorizontal
      flex={1}
      title={showPost ? 'Post' : 'Comentários'}
      canGoBack>
      <Box flex={1} justifyContent="space-between">
        <FlatList
          data={list}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: bottom}}
          ListHeaderComponent={
            post && <PostItem post={post} hideCommentAction={showPost} />
          }
          ListFooterComponent={
            <PostCommentBottom
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          }
        />
        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  );
}
