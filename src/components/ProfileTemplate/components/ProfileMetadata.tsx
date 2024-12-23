import React from 'react';

import {Box} from '../../Box/Box';
import {Text} from '../../Text/Text';

type Props = {
  followersCount: string;
  followingCount: string;
  publicationCount: string;
};
export function ProfileMetadata({
  followersCount,
  followingCount,
  publicationCount,
}: Props) {
  const items: ItemType[] = [
    {label: 'Publicações', value: publicationCount},
    {label: 'Seguidores', value: followersCount},
    {label: 'Seguindo', value: followingCount},
  ];

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      mt="s24"
      columnGap="s32">
      {items.map(item => (
        <Box key={item.label}>
          <Item {...item} />
        </Box>
      ))}
    </Box>
  );
}

type ItemType = {
  value: string;
  label: string;
};

function Item({label, value}: ItemType) {
  return (
    <Box alignItems="center">
      <Text preset="headingSmall">{value ?? value}</Text>
      <Text preset="paragraphSmall">{label ?? label}</Text>
    </Box>
  );
}
