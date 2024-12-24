import React from 'react';

import {User} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {BackButton} from '../../BackButton/BackButton';
import {Box} from '../../Box/Box';
import {Icon} from '../../Icon/Icon';
import {ProfileAvatar} from '../../ProfileAvatar/ProfileAvatar';
import {Text} from '../../Text/Text';

import {ProfileButton} from './ProfileButton';
import {ProfileMetadata} from './ProfileMetadata';

type Props = {
  user: User;
  isMyProfile?: boolean;
  pulicationCount: string;
};

export function ProfileHeader({user, isMyProfile, pulicationCount}: Props) {
  const navigation = useNavigation();
  return (
    <Box paddingHorizontal="s24">
      <Box alignItems="center">
        <ProfileAvatar
          imageURL={user?.profileURL}
          size={100}
          borderRadius={40}
        />

        <Text preset="headingMedium" mt="s16">
          {user.fullName}
        </Text>
        <Text preset="paragraphLarge" mt="s4" color="gray1">
          @{user.username}
        </Text>
        <ProfileMetadata
          followersCount={user.meta.followersCount}
          followingCount={user.meta.followingCount}
          publicationCount={pulicationCount}
        />
        {isMyProfile ? (
          <Box position="absolute" alignSelf="flex-end">
            <Icon
              name="settings"
              size={30}
              onPress={() => navigation.navigate('SettingsScreen')}
            />
          </Box>
        ) : (
          <Box position="absolute" alignSelf="flex-start" left={-24}>
            <BackButton />
          </Box>
        )}
      </Box>
      <ProfileButton isMyProfile isFollowing />
    </Box>
  );
}
