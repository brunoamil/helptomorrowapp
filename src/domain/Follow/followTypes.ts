import {User, UserAPI} from '../User/userTypes';

export interface FollowingUserAPI {
  id: number;
  followed_user_id: string;
  followed: UserAPI;
}

export interface FollowerUserAPI {
  id: number;
  follower_user_id: string;
  follower: UserAPI;
}

export interface FollowUser extends User {
  followId: number;
}
