import React from 'react';

import {User} from '@domain';

import {Box, PressableBox, ProfileAvatar, Text} from '@components';

type Props = {
  user?: User;
};
export function EditProfileHeader({user}: Props) {
  if (!user) {
    return null;
  }

  function navigateToPhoto() {}

  return (
    <Box flexDirection="row" alignItems="center">
      <ProfileAvatar imageURL={user?.profileURL} size={64} borderRadius={24} />
      <PressableBox hitSlop={10} onPress={navigateToPhoto}>
        <Text preset="paragraphMedium" color="primary" bold ml="s16">
          Alterar foto
        </Text>
      </PressableBox>
    </Box>
  );
}
