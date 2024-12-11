import React from 'react';
import {Pressable} from 'react-native';

import {User} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {Box, ProfileAvatar, Text} from '@components';

type ProfileUserProps = {user: Pick<User, 'username' | 'profileURL' | 'id'>};
export function ProfileUser({user}: ProfileUserProps) {
  const navigation = useNavigation();

  function navigateToProfile() {
    navigation.navigate('ProfileScreen', {userId: user.id});
  }
  return (
    <Pressable onPress={navigateToProfile}>
      <Box flexDirection="row" alignItems="center" mb="s16">
        <ProfileAvatar imageURL={user.profileURL} />
        <Text preset="paragraphMedium" semiBold ml="s12">
          {user.username}
        </Text>
      </Box>
    </Pressable>
  );
}
