// Generated by https://quicktype.io

export interface ICommunityMembers {
  community: Community;
  users: User[];
}

export interface Community {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
}
