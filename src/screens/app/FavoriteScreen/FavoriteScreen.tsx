import React from 'react';
import {Dimensions, Image, ListRenderItemInfo} from 'react-native';

import {PostReaction, postReactionService} from '@domain';
import {QueryKeys} from '@infra';

import {InfinityScrollList, PressableBox, Screen, Text} from '@components';
import {useAppNavigation} from '@hooks';
import {AppTabScreenProps} from '@routes';

const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_PADDING = 24;
const ITEM_MARGIN = 16;

const ITEM_WIDTH = (SCREEN_WIDTH - SCREEN_PADDING * 2) / NUM_COLUMNS;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FavoriteScreen(props: AppTabScreenProps<'FavoriteScreen'>) {
  const navigate = useAppNavigation();

  function renderItem({item}: ListRenderItemInfo<PostReaction>) {
    return (
      <PressableBox
        onPress={() =>
          navigate.toPostDetails({
            postId: item.postId,
            postAuthorId: item.author.id,
          })
        }>
        <Image
          source={{uri: item.post.imageURL}}
          style={{width: ITEM_WIDTH, height: ITEM_WIDTH}}
        />
        <Text semiBold mt="s4">
          {item.author.username}
        </Text>
      </PressableBox>
    );
  }
  return (
    <Screen flex={1} title="Favoritos">
      <InfinityScrollList
        getList={page => postReactionService.getMyReactions('favorite', page)}
        queryKey={[QueryKeys.FavoriteList]}
        renderItem={renderItem}
        flatListProps={{
          numColumns: NUM_COLUMNS,
          columnWrapperStyle: {columnGap: ITEM_MARGIN},
          contentContainerStyle: {
            rowGap: SCREEN_PADDING,
          },
        }}
        emptyListProps={{
          emptyMessage: 'Não há favoritos',
          errorMessage: 'Erro ao carregar favoritos',
        }}
      />
    </Screen>
  );
}
