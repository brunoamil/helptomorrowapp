import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {User} from '@domain';
import {useSearchHistory, useSearchHistoryService} from '@services';

import {Box, Icon, ProfileUser, Text} from '@components';

export function SearchHistory() {
  const userList = useSearchHistory();
  const {removeUser} = useSearchHistoryService();

  function renderItem({item}: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        user={item}
        avatarProps={{size: 48}}
        RightComponent={
          <Icon
            name="trash"
            color="primary"
            onPress={() => removeUser(item.id)}
          />
        }
      />
    );
  }

  return (
    <Box>
      <FlatList
        data={userList}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text preset="headingMedium" mb="s16">
            Buscas recentes
          </Text>
        }
      />
    </Box>
  );
}
