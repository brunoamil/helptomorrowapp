import React, {useState} from 'react';
import {ListRenderItemInfo} from 'react-native';

import {FollowUser} from '@domain';
import {QueryKeys} from '@infra';
import {Page} from '@types';

import {Box} from '../Box/Box';
import {Button} from '../Button/Button';
import {InfinityScrollList} from '../InfinityScrollList/InfinityScrollList';
import {ProfileUser} from '../ProfileUser/ProfileUser';
import {Screen} from '../Screen/Screen';
import {Text} from '../Text/Text';

type Props = {
  getUserList: (page: number) => Promise<Page<FollowUser>>;
  screenTitle: string;
  totalText: string;
  emptyMessage: string;
  queryKey: QueryKeys;
  button: {
    title: string;
    onPress: (followUser: FollowUser) => void;
  };
};
export function UserListTemplate({
  button,
  getUserList,
  queryKey,
  screenTitle,
  emptyMessage,
  totalText,
}: Props) {
  const [totaluser, setTotalUser] = useState<number | null>(null);
  function renderItem({item}: ListRenderItemInfo<FollowUser>) {
    return (
      <Box>
        <ProfileUser
          user={item}
          RightComponent={
            <Button
              title={button.title}
              preset="gray"
              onPress={() => button.onPress(item)}
            />
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
        {totaluser} {totalText}
      </Text>
    );
  }

  async function getList(page: number) {
    const response = await getUserList(page);
    setTotalUser(response.meta.total);
    return response;
  }
  return (
    <Screen flex={1} title={screenTitle} canGoBack>
      <InfinityScrollList
        getList={getList}
        queryKey={[queryKey]}
        renderItem={renderItem}
        flatListProps={{
          ListHeaderComponent: renderListHeader,
        }}
        emptyListProps={{
          emptyMessage,
          errorMessage: 'Erro ao carregar lista',
        }}
      />
    </Screen>
  );
}
