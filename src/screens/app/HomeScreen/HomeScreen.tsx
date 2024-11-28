import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Post, postService} from '@domain';

import {PostItem, Screen} from '@components';
import {AppTabScreenProps} from '@routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomeScreen({navigation}: AppTabScreenProps<'HomeScreen'>) {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    postService.getList().then(list => {
      console.log(list);
      setPostList(list);
    });
  }, []);

  function renderItem({item}: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }
  return (
    <Screen>
      <FlatList
        renderItem={renderItem}
        data={postList}
        keyExtractor={item => item.id}
      />
    </Screen>
  );
}
