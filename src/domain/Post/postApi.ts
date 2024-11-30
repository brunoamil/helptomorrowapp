import {postListMock} from './postListMock';
import {Post} from './postTypes';

async function getList(): Promise<Post[]> {
  // await new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve('');
  //   }, 1000);
  // });
  let response = await fetch('http://localhost:3333/user/post', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer Nw.uIxtFWCmy4hMf0FoL6N3U8Yw9YcXAh6gbYPHG1UMG7qwoK-y3-2sE4qBONdB',
    },
  });

  let data = await response.json();
  console.log('FETCH DATA', data);
  return postListMock;
}

export const postApi = {
  getList,
};
