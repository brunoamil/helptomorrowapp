import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';

import {useUserGetById} from '@domain';

import {ActivityIndicator, Box, ProfileAvatar, Screen, Text} from '@components';
import {AppScreenProps} from '@routes';

export function ProfileScreen({route}: AppScreenProps<'ProfileScreen'>) {
  const userId = route.params?.userId;
  const {isLoading, isError, user, refetch, isFetching} =
    useUserGetById(userId);

  return (
    <Screen canGoBack flex={1}>
      {isLoading && <ActivityIndicator color="backgroundContrast" />}
      {isError && <Text>error ao carregar perfil do usuário</Text>}
      {user && (
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }>
          <Box alignItems="center" flex={1}>
            <ProfileAvatar
              imageURL={user.profileURL}
              size={64}
              borderRadius={24}
            />
            <Text preset="headingMedium">{user.username}</Text>
            <Text>@{user.username}</Text>
          </Box>
        </ScrollView>
      )}
    </Screen>
  );
}
