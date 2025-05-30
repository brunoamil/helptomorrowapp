import React from 'react';
import {GestureResponderEvent} from 'react-native';

import {User} from '@domain';

import {useAppNavigation} from '@hooks';

import {PressableBox, Box, PressableBoxProps} from '../Box/Box';
import {
  ProfileAvatar,
  ProfileAvatarProps,
} from '../ProfileAvatar/ProfileAvatar';
import {Text} from '../Text/Text';

type ProfileUserProps = {
  user: Pick<User, 'username' | 'profileURL' | 'id'>;
  avatarProps?: Omit<Partial<ProfileAvatarProps>, 'imageURL'>;
  RightComponent?: React.ReactElement;
} & PressableBoxProps;
export function ProfileUser({
  user,
  onPress,
  avatarProps,
  RightComponent,
  ...pressableBoxProps
}: ProfileUserProps) {
  const navigate = useAppNavigation();

  function handleOnPress(event: GestureResponderEvent) {
    if (onPress) {
      onPress(event);
    }
    navigate.toProfile(user.id);
  }
  return (
    <PressableBox
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s16"
      onPress={handleOnPress}
      {...pressableBoxProps}>
      <Box flexDirection="row" alignItems="center">
        <ProfileAvatar
          imageURL={user.profileURL}
          {...avatarProps}
          authorId={user.id}
        />
        <Text preset="paragraphMedium" semiBold ml="s12">
          {user.username}
        </Text>
      </Box>
      {RightComponent}
    </PressableBox>
  );
}
