import React, {useState} from 'react';
import {ListRenderItemInfo} from 'react-native';

import {followService, FollowUser} from '@domain';
import {QueryKeys} from '@infra';

import {
  Box,
  Button,
  InfinityScrollList,
  ProfileUser,
  Screen,
  Text,
} from '@components';
import {AppScreenProps} from '@routes';
export function MyFollowingScreen({}: AppScreenProps<'MyFollowingScreen'>) {
  const [totaluser, setTotalUser] = useState<number | null>(null);
  function renderItem({item}: ListRenderItemInfo<FollowUser>) {
    return (
      <Box>
        <ProfileUser
          user={item}
          RightComponent={
            <Button title="Seguindo" preset="gray" onPress={() => {}} />
          }
        />
      </Box>
    );
  }

  function renderListHeader() {
    if (!totaluser) {
      return null;
    }

    return (
      <Text semiBold preset="paragraphSmall" color="primary" mb="s24">
        {totaluser} seguindo
      </Text>
    );
  }

  async function getList(page: number) {
    const response = await followService.getMyFollowingList(page);
    setTotalUser(response.meta.total);
    return response;
  }
  return (
    <Screen flex={1} title="Seguindo" canGoBack>
      <InfinityScrollList
        getList={getList}
        queryKey={[QueryKeys.MyFollowingList]}
        renderItem={renderItem}
        flatListProps={{
          ListHeaderComponent: renderListHeader,
        }}
      />
    </Screen>
  );
}
