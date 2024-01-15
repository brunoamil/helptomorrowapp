export interface Post {
  id: number;
  text: string;
  author: {
    id: number;
    profileURL: string;
    name: string;
    userName: string;
  };
  imageURL: string;
  reactionCount: number;
  commentCount: number;
  favoriteCount: number;
}

export interface PostAPI {
  id: number; // 10;
  text: string; // 'Time to fly!';
  user_id: number; // 2;
  image_url: string; // 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/post10.jpg';
  is_fixed: boolean; // false;
  is_activated: boolean; //true;
  created_at: string; // '2024-01-12T09:09:27.936-03:00';
  updated_at: string; // '2024-01-13T00:09:27.959-03:00';
  user: {
    id: number; // 2;
    first_name: string; // 'Tamires';
    last_name: string; // 'Silva';
    username: string; // 'tami_silva';
    email: string; // 'tsilva@coffstack.com';
    profile_url: string; // 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/4-tamires.png';
    is_online: boolean; // false;
    full_name: string; // 'Tamires Silva';
  };
  status: string; // 'published';
  meta: {
    like_count: string; // '6';
    favorite_count: string; // '2';
    comments_count: string; // '5';
  };
}
