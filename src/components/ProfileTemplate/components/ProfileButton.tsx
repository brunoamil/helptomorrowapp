import React from 'react';

import {useFollowUser} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {Button, ButtonProps} from '../../Button/Button';

type ButttonVariant = 'myProfile' | 'isFollowing' | 'isNotFollwing' | 'loading';

const buttonVariants: Record<
  ButttonVariant,
  Pick<ButtonProps, 'title' | 'preset' | 'loading'>
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
  loading: {
    title: 'Carregando...',
    preset: 'outline',
    loading: true,
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
  const {followUser, isLoading} = useFollowUser();
  const navigation = useNavigation();
  const variant = getVariant({isFollowing, isMyProfile, isLoading});
  const buttonPreset = buttonVariants[variant];

  function handleOnPress() {
    switch (variant) {
      case 'isFollowing':
        break;
      case 'isNotFollwing':
        followUser(userId);
        break;
      case 'myProfile':
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
  isLoading,
}: Pick<ProfileButtonProps, 'isFollowing' | 'isMyProfile'> & {
  isLoading: boolean;
}): ButttonVariant {
  if (isLoading) {
    return 'loading';
  }
  if (isMyProfile) {
    return 'myProfile';
  }
  if (isFollowing) {
    return 'isFollowing';
  }

  return 'isNotFollwing';
}
