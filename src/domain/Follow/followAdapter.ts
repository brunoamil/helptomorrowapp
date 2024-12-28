import {userAdapter} from '../User/userAdapter';

import {FollowerUserAPI, FollowingUserAPI, FollowUser} from './followTypes';

function fromFollowingToUser(followingUser: FollowingUserAPI): FollowUser {
  return {
    followId: followingUser.id,
    ...userAdapter.toUser(followingUser.followed),
  };
}

function fromFollowerToUser(followerUser: FollowerUserAPI): FollowUser {
  return {
    followId: followerUser.id,
    ...userAdapter.toUser(followerUser.follower),
  };
}

export const followAdapter = {
  fromFollowingToUser,
  fromFollowerToUser,
};
