import {apiAdapter} from '@api';
import {ImageForUpload} from '@services';
import {Page} from '@types';

import {postAdapter} from './postAdapter';
import {postApi} from './postApi';
import {Post} from './postTypes';

async function getList(page: number): Promise<Page<Post>> {
  const postPageAPI = await postApi.getList({page, per_page: 10});
  // return [];
  // throw new Error('Erro de teste');

  return apiAdapter.toPageModel(postPageAPI, postAdapter.toPost);
  // return {
  //   meta: apiAdapter.toMetaDataPage(postPageAPI.meta),
  //   data: postPageAPI.data.map(postAdapter.toPost),
  // };
}

async function createPost(
  text: string,
  postImage: ImageForUpload,
): Promise<Post> {
  const postApiData = await postApi.createPost(text, postImage);
  return postAdapter.toPost(postApiData);
}

export const postService = {
  getList,
  createPost,
};
