export interface PostComment {
  id: number;
  message: string;
  created_at: string;
  author: {
    id: number;
    profileURL: string;
    name: string;
    userName: string;
  };
}

export interface PostCommentAPI {
  id: number; // 115;
  message: string; // 'Summopere tonsor laboriosam.';
  user_id: number; // 5;
  post_id: number; // 1;
  created_at: string; // '2024-01-12T02:01:31.000-03:00';
  updated_at: string; // '2024-01-13T19:14:30.350-03:00';
  user: {
    id: number; //  5;
    first_name: string; //  'Vanessa';
    last_name: string; //  'Isidório';
    username: string; // 'vanessa_isidorio';
    email: string; // 'vanessa123@coffstack.com';
    profile_url: string; // 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/9-vanessa.png';
    is_online: boolean; //  false;
    full_name: string; // 'Vanessa Isidório';
  };
  meta: any; // {};
}
