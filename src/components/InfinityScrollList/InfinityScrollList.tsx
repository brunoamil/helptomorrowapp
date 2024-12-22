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
  queryKey: Parameters<typeof usePaginatedListRQ<ItemT>>[0];
  getList: Parameters<typeof usePaginatedListRQ<ItemT>>[1];
  // getList: (page: number) => Promise<Page<Data>>,
  renderItem: FlatListProps<ItemT>['renderItem'];
  flatListProps?: Omit<Partial<FlatListProps<ItemT>>, 'renderItem'>;
  emptyListProps?: Pick<EmptyListProps, 'emptyMessage' | 'errorMessage'>;
};
export function InfinityScrollList<ItemT extends ItemTConstrains>({
  emptyListProps,
  flatListProps,
  queryKey,
  getList,
  renderItem,
}: Props<ItemT>) {
  const {list, isError, isLoading, refresh, fetchNextPage} = usePaginatedListRQ(
    queryKey,
    getList,
  );

  const flatListRef = React.useRef<FlatList<ItemT>>(null);
  useScrollToTop(flatListRef);

  return (
    <FlatList
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      data={list}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      refreshing={isLoading}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      ListEmptyComponent={
        <EmptyList
          refetch={refresh}
          error={isError}
          loading={isLoading}
          {...emptyListProps}
        />
      }
      {...flatListProps}
      contentContainerStyle={[
        {
          flex: list.length === 0 ? 1 : undefined,
        },
        flatListProps?.contentContainerStyle,
      ]}
    />
  );
}
