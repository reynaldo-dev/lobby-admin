export interface IEvent {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: string;
  place: string;
  dateTime: string;
  communityId: string;
  community: Community;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}
