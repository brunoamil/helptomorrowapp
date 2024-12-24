import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {Post, usePostList, useUserGetById} from '@domain';

import {Screen} from '../Screen/Screen';

import {ProfileHeader} from './components/ProfileHeader';

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS;
type Props = {
  userId: number;
  isMyProfile?: boolean;
};
export function ProfileTemplate({userId, isMyProfile}: Props) {
  const {user} = useUserGetById(userId);
  const {list} = usePostList();

  function renderItem({item}: ListRenderItemInfo<Post>) {
    return (
      <Image
        source={{uri: item.imageURL}}
        style={{width: ITEM_WIDTH, height: ITEM_WIDTH}}
      />
    );
  }

  function renderListHeader() {
    if (!user) {
      return null;
    }
    return <ProfileHeader user={user} isMyProfile={isMyProfile} />;
  }
  return (
    <Screen flex={1} canGoBack={!isMyProfile} style={$screen}>
      <FlatList
        data={list}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        ListHeaderComponent={renderListHeader}
        keyExtractor={item => item.id.toString()}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingHorizontal: 0,
};
