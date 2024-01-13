import {PageAPI, PageParams, api} from '@api';

import {PostAPI} from './postType';

async function getList({page, per_page}: PageParams = {}): Promise<
  PageAPI<PostAPI>
> {
  // Simulando um delay na API
  await new Promise(resolve => setTimeout(() => resolve(''), 1000));
  // let response = await fetch('user/post', {
  //   method: 'GET',
  //   headers: {
  //     Authorization:
  //       'Bearer NA.CMkqhtq4HzA46IcpF4JHahU0hGQz-MdoUmyEJJY-8PvFep4WBFnBRpt8fXHH',
  //   },
  // });
  // let data = await response.json();
  // return data;
  const response = await api.get<PageAPI<PostAPI>>('user/post', {
    params: {
      page,
      per_page,
    },
  });
  return response.data;
}
export const postApi = {
  getList,
};
