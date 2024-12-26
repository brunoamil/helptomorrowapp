import React from 'react';

import {User} from '@domain';

import {Box, BoxProps, PressableBox, ProfileAvatar, Text} from '@components';

type Props = {
  user?: User;
} & BoxProps;
export function EditProfileHeader({user, ...boxProps}: Props) {
  if (!user) {
    return null;
  }

  function navigateToPhoto() {}

  return (
    <Box flexDirection="row" alignItems="center" {...boxProps}>
      <ProfileAvatar imageURL={user?.profileURL} size={64} borderRadius={24} />
      <PressableBox hitSlop={10} onPress={navigateToPhoto}>
        <Text preset="paragraphMedium" color="primary" bold ml="s16">
          Alterar foto
        </Text>
      </PressableBox>
    </Box>
  );
}
