import {apiAdapter} from '@api';
import {Page} from '@types';

import {userAdapter} from './userAdapter';
import {userApi} from './userApi';
import {User, UserDetails} from './userTypes';

async function getById(id: number): Promise<UserDetails> {
  const userAPI = await userApi.getById(id.toString());
  const {isFollowing} = await userApi.isFollowing(id.toString());
  return userAdapter.toUserDetails(userAPI, isFollowing);

  // return userAdapter.toUser(userAPI);
}

async function searchUser(search: string): Promise<Page<User>> {
  const userPageApi = await userApi.getList(search);

  return apiAdapter.toPageModel(userPageApi, userAdapter.toUser);
}

export const userService = {
  getById,
  searchUser,
};
