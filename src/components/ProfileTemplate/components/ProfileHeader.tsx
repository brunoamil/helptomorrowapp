import React from 'react';

import {UserDetails} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {BackButton} from '../../BackButton/BackButton';
import {Box} from '../../Box/Box';
import {Icon} from '../../Icon/Icon';
import {ProfileAvatar} from '../../ProfileAvatar/ProfileAvatar';
import {Text} from '../../Text/Text';

import {ProfileButton} from './ProfileButton';
import {ProfileMetadata} from './ProfileMetadata';

type Props = {
  userDetails: UserDetails;
  isMyProfile?: boolean;
  pulicationCount: string;
};

export function ProfileHeader({
  userDetails,
  isMyProfile,
  pulicationCount,
}: Props) {
  const navigation = useNavigation();
  return (
    <Box paddingHorizontal="s24">
      <Box alignItems="center">
        <ProfileAvatar
          imageURL={userDetails?.profileURL}
          size={100}
          borderRadius={40}
        />

        <Text preset="headingMedium" mt="s16">
          {userDetails.fullName}
        </Text>
        <Text preset="paragraphLarge" mt="s4" color="gray1">
          @{userDetails.username}
        </Text>
        <ProfileMetadata
          followersCount={userDetails.meta?.followersCount}
          followingCount={userDetails.meta?.followingCount}
          publicationCount={pulicationCount}
          isMyProfile={isMyProfile}
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
      <ProfileButton
        isMyProfile={isMyProfile}
        isFollowing={userDetails.isFollowing}
        userId={userDetails.id}
      />
    </Box>
  );
}
