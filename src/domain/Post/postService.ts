import {apiAdapter} from '@api';
import {Page} from '@types';

import {postAdapter} from './postAdapter';
import {postApi} from './postApi';
import {Post} from './postTypes';

async function getList(page: number): Promise<Page<Post>> {
  const postPageAPI = await postApi.getList({page, per_page: 10});
  // return [];
  // throw new Error('Erro de teste');

  return {
    meta: apiAdapter.toMetaDataPage(postPageAPI.meta),
    data: postPageAPI.data.map(postAdapter.toPost),
  };
}

export const postService = {
  getList,
};
