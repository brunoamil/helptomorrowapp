import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, PressableBox} from '../../Box/Box';
import {Text} from '../../Text/Text';

type Props = {
  followersCount: string;
  followingCount: string;
  publicationCount: string;
  isMyProfile?: boolean;
};
export function ProfileMetadata({
  followersCount,
  followingCount,
  publicationCount,
  isMyProfile,
}: Props) {
  const navigation = useNavigation();
  const items: ItemType[] = [
    {label: 'Publicações', value: publicationCount},
    {
      label: 'Seguidores',
      value: followersCount,
      onPress: () => {
        navigation.navigate('MyFollowersScreen');
      },
    },
    {
      label: 'Seguindo',
      value: followingCount,
      onPress: () => {
        navigation.navigate('MyFollowingScreen');
      },
    },
  ];

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      mt="s24"
      columnGap="s32">
      {items.map(item => (
        <Box key={item.label}>
          <Item {...item} isMyProfile={isMyProfile} />
        </Box>
      ))}
    </Box>
  );
}

type ItemType = {
  value: string;
  label: string;
  onPress?: () => void;
};

function Item({
  label,
  value,
  onPress,
  isMyProfile,
}: ItemType & {isMyProfile?: boolean}) {
  return (
    <PressableBox alignItems="center" onPress={onPress} disabled={!isMyProfile}>
      <Text preset="headingSmall">{value ?? value}</Text>
      <Text preset="paragraphSmall">{label ?? label}</Text>
    </PressableBox>
  );
}
