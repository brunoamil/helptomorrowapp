import React from 'react';

import {InfinityScrollList, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';
import { Image, ListRenderItemInfo } from 'react-native';
import { QueryKeys } from '@infra';
import { PostReaction, postReactionService } from '@domain';

export function FavoriteScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AppTabScreenProps<'FavoriteScreen'>) {
  
  function renderItem({item}: ListRenderItemInfo<PostReaction>) {
    return (
      <Image 
        source={{ uri: item.post.imageURL}}
        style={{ width: 300, height: 300}}
      />
    )
  }
  return (
    <Screen flex={1}>
      <Text preset="headingSmall">Favorite Screen</Text>
      <InfinityScrollList 
      getList={(page) => postReactionService.getMyReactions('favorite', page)}
      queryKey={[QueryKeys.FavoriteList]}
      renderItem={renderItem}
      
      emptyListProps={{
        emptyMessage: 'Não há favoritos',
        errorMessage: 'Erro ao carregar favoritos'
      }}
      />
    </Screen>
  );
}
