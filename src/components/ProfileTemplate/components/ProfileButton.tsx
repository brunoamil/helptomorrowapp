import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Button, ButtonProps} from '../../Button/Button';

type ButttonVariant = 'myProfile' | 'isFollowing' | 'isNotFollwing';

const buttonVariants: Record<
  ButttonVariant,
  Pick<ButtonProps, 'title' | 'preset'>
> = {
  myProfile: {
    title: 'Editar perfil',
    preset: 'gray',
  },
  isFollowing: {
    title: 'Mensagem',
    preset: 'primary',
  },
  isNotFollwing: {
    title: 'Seguir',
    preset: 'outline',
  },
};

type ProfileButtonProps = {
  isMyProfile?: boolean;
  isFollowing?: boolean;
  userId: number;
};

export function ProfileButton({
  isMyProfile,
  isFollowing,
  userId,
}: ProfileButtonProps) {
  const navigation = useNavigation();
  const variant = getVariant({isFollowing, isMyProfile});
  const buttonPreset = buttonVariants[variant];

  function handleOnPress() {
    if (isMyProfile) {
      navigation.navigate('EditProfileScreen', {
        userId,
      });
    }
  }

  return (
    <Button marginVertical="s24" {...buttonPreset} onPress={handleOnPress} />
  );
}

function getVariant({
  isFollowing,
  isMyProfile,
}: Pick<ProfileButtonProps, 'isFollowing' | 'isMyProfile'>): ButttonVariant {
  if (isMyProfile) {
    return 'myProfile';
  }
  if (isFollowing) {
    return 'isFollowing';
  }

  return 'isNotFollwing';
}
