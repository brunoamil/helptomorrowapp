import React from 'react';
import {Image} from 'react-native';

import {useCameralRoll} from '@services';

import {Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function NewPostScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AppTabScreenProps<'NewPostScreen'>) {
  const {list} = useCameralRoll();
  return (
    <Screen scrollable>
      <Text preset="headingSmall">New Post Screen</Text>
      {list.map(photo => (
        <Image
          key={photo}
          source={{uri: photo}}
          style={{width: 200, height: 200}}
        />
      ))}
    </Screen>
  );
}
