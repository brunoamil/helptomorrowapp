import React, {useState} from 'react';

import {Icon, Screen, Text, TextInput} from '@components';
import {AppScreenProps} from '@routes';

export function SearchScreen({}: AppScreenProps<'SearchScreen'>) {
  const [search, setSearch] = useState('');

  return (
    <Screen
      canGoBack
      HeaderComponent={
        <TextInput
          placeholder="Digite sua busca"
          value={search}
          onChangeText={setSearch}
          LeftComponent={<Icon name="search" color="gray3" />}
        />
      }>
      <Text>Search Screen</Text>
    </Screen>
  );
}
