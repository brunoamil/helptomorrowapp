import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';

import {useCameralRoll} from '@services';

import {Screen} from '@components';
import {AppTabScreenProps} from '@routes';

import {Header} from './components/Header';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const NUM_COLUMNS = 4;
const ITEM_WIDTH = SCREEN_WIDTH / 4;
export function NewPostScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AppTabScreenProps<'NewPostScreen'>) {
  const [selectedImage, setSelectedImage] = useState<string>();
  const {photoList, fetchNextPage} = useCameralRoll(true, setSelectedImage);
  const flatListRef = useRef<FlatList>(null);

  function onSelectImage(imageUri: string) {
    setSelectedImage(imageUri);
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  }
  function renderItem({item}: ListRenderItemInfo<string>) {
    return (
      <Pressable onPress={() => onSelectImage(item)}>
        <Image
          key={item}
          source={{uri: item}}
          style={{width: ITEM_WIDTH, height: ITEM_WIDTH}}
        />
      </Pressable>
    );
  }
  return (
    <Screen canGoBack title="Novo post" noPaddingHorizontal>
      <FlatList
        ref={flatListRef}
        data={photoList}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <Header imageUri={selectedImage} imageWidth={SCREEN_WIDTH} />
        }
      />
    </Screen>
  );
}
