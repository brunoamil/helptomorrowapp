import React from 'react';

import {InfinityScrollList, Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function FavoriteScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AppTabScreenProps<'FavoriteScreen'>) {
  
  return (
    <Screen flex={1}>
      <Text preset="headingSmall">Favorite Screen</Text>
      <InfinityScrollList 

      flatListProps={{
      }}
      emptyListProps={{
        emptyMessage: 'Não há favoritos',
        errorMessage: 'Erro ao carregar favoritos'
      }}
      />
    </Screen>
  );
}
