import React, {useRef} from 'react';
import {FlatList, FlatListProps, RefreshControl} from 'react-native';

import {Post} from '@domain';
import {useScrollToTop} from '@react-navigation/native';

import {AppTabScreenProps} from '@routes';

import {QueryKeys, usePaginatedListRQ} from '@infra';
import {EmptyList, EmptyListProps} from './components/EmptyList';
import {Page} from '@types';

type ItemTConstrains = {
  id: number | string;
};
type Props<ItemT extends ItemTConstrains> = {
  queryKey: QueryKeys;
  //   getList: (page: number) => Promise<Page<ItemT>>;
  getList: Parameters<typeof usePaginatedListRQ>[1];
  flatListProps: Omit<Partial<FlatListProps<ItemT>>, 'renderItem'>;
  renderItem: FlatListProps<ItemT>['renderItem'];
  emptyListProps: Pick<EmptyListProps, 'emptyMessage' | 'errorMessage'>;
};
export function InfinityScrollList<ItemT extends ItemTConstrains>({
  emptyListProps,
  flatListProps,
  getList,
  queryKey,
  renderItem,
}: Props<ItemT>) {
  const {list, isError, isLoading, refresh, fetchNextPage} = usePaginatedListRQ(
    [queryKey],
    getList,
  );

  const flatListRef = useRef<FlatList<ItemT>>(null);
  useScrollToTop(flatListRef);

  return (
    <FlatList
      ref={flatListRef}
      renderItem={renderItem}
      data={list}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      refreshing={isLoading}
      ListEmptyComponent={
        <EmptyList
          loading={isLoading}
          error={isError}
          refetch={refresh}
          {...emptyListProps}
        />
      }
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{flex: list.length === 0 ? 1 : undefined}}
      {...flatListProps}
    />
  );
}
