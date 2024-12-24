import React from 'react';
import {FlatList, Image, ListRenderItemInfo} from 'react-native';

import {Post, usePostList, useUserGetById} from '@domain';

import {Screen} from '../Screen/Screen';

import {ProfileHeader} from './components/ProfileHeader';

type Props = {
  userId: number;
  isMyProfile?: boolean;
};
export function ProfileTemplate({userId, isMyProfile}: Props) {
  const {user} = useUserGetById(userId);
  const {list} = usePostList();

  function renderItem({item}: ListRenderItemInfo<Post>) {
    return (
      <Image source={{uri: item.imageURL}} style={{width: 100, height: 100}} />
    );
  }

  function renderListHeader() {
    if (!user) {
      return null;
    }
    return <ProfileHeader user={user} />;
  }
  return (
    <Screen flex={1} canGoBack={!isMyProfile}>
      <FlatList
        data={list}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
      />
    </Screen>
  );
}
