import React from 'react';

import {Box, InfinityScrollList, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';
import { Dimensions, Image, ListRenderItemInfo } from 'react-native';
import { QueryKeys } from '@infra';
import { PostReaction, postReactionService } from '@domain';


const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_PADDING = 24;
const ITEM_MARGIN = 16;

const ITEM_WIDTH = (SCREEN_WIDTH - SCREEN_PADDING * 2) / NUM_COLUMNS;
export function FavoriteScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AppTabScreenProps<'FavoriteScreen'>) {
  
  function renderItem({item}: ListRenderItemInfo<PostReaction>) {
    return (
      <Box>
        <Image 
        source={{ uri: item.post.imageURL}}
        style={{ width: ITEM_WIDTH, height: ITEM_WIDTH}}
      />
      <Text semiBold mt="s4">{item.author.username}</Text>
      </Box>
    )
  }
  return (
    <Screen flex={1} title='Favoritos'>
      <InfinityScrollList 
      getList={(page) => postReactionService.getMyReactions('favorite', page)}
      queryKey={[QueryKeys.FavoriteList]}
      renderItem={renderItem}
      flatListProps={{
        numColumns: NUM_COLUMNS,
        columnWrapperStyle: {columnGap: ITEM_MARGIN},
        contentContainerStyle: {
          rowGap: SCREEN_PADDING,
        }
      }}
      emptyListProps={{
        emptyMessage: 'Não há favoritos',
        errorMessage: 'Erro ao carregar favoritos'
      }}
      />
    </Screen>
  );
}
