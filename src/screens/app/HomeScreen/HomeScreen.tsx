import React from 'react';
import {ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';

import {Post, postService} from '@domain';
import {QueryKeys} from '@infra';

import {InfinityScrollList, PostItem, Screen} from '@components';
import {AppTabScreenProps} from '@routes';

import {HomeHeader} from './components/HomeHeader';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomeScreen({navigation}: AppTabScreenProps<'HomeScreen'>) {
  // const {
  //   list: PostList,
  //   isError,
  //   isLoading,
  //   refresh,
  //   fetchNextPage,
  // } = usePostList();
  // const flatListRef = useRef<FlatList<Post>>(null);
  // useScrollToTop(flatListRef);

  function renderItem({item}: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }

  return (
    <Screen style={$screen}>
      <InfinityScrollList
        renderItem={renderItem}
        queryKey={[QueryKeys.PostList]}
        getList={postService.getList}
        flatListProps={{ListHeaderComponent: <HomeHeader />}}
      />
      {/* <FlatList
        ref={flatListRef}
        renderItem={renderItem}
        data={PostList}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
        refreshing={isLoading}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty loading={isLoading} error={isError} refetch={refresh} />
        }
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{flex: PostList.length === 0 ? 1 : undefined}}
      /> */}
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingHorizontal: 0,
  paddingTop: 0,
  flex: 1,
};
