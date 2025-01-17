import React from 'react';

import {followService, useRemoveFollow} from '@domain';
import {QueryKeys} from '@infra';
import {useToastService} from '@services';

import {UserListTemplate} from '@components';
import {AppScreenProps} from '@routes';
export function MyFollowingScreen({}: AppScreenProps<'MyFollowingScreen'>) {
  const {showToast} = useToastService();
  const {removeFollow, undoRemoveFollow} = useRemoveFollow({
    onSuccess: () => {
      showToast({
        message: 'Seguidor removidooo',
        position: 'bottom',
        action: {
          title: 'Desfazer',
          onPress: () => {
            undoRemoveFollow();
          },
        },
      });
    },
  });

  return (
    <UserListTemplate
      screenTitle="Seguindos"
      emptyMessage="Você ainda não está seguindo ninguemssz"
      totalText="seguindo"
      queryKey={QueryKeys.MyFollowingList}
      getUserList={followService.getMyFollowingList}
      button={{
        title: 'Seguindo',
        onPress: followUser =>
          removeFollow({
            followId: followUser.followId,
            userId: followUser.id,
          }),
      }}
    />
  );
  // return (
  //   <Screen flex={1} title="Seguindo" canGoBack>
  //     <InfinityScrollList
  //       getList={getList}
  //       queryKey={[QueryKeys.MyFollowingList]}
  //       renderItem={renderItem}
  //       flatListProps={{
  //         ListHeaderComponent: renderListHeader,
  //       }}
  //     />
  //   </Screen>
  // );
}
