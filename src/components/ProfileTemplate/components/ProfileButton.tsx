import React from 'react';

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
};

export function ProfileButton({isMyProfile, isFollowing}: ProfileButtonProps) {
  const variant = getVariant({isFollowing, isMyProfile});
  const buttonPreset = buttonVariants[variant];

  function handleOnPress() {}

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
