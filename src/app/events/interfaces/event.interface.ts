// Generated by https://quicktype.io

export interface IEvent {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: string;
  place?: string;
  communityId: string;
  credits: number;
  dateTime: string;
  link?: string;
  eventCategoryId: string;
  eventFormatId: string;
  community: Community;
  Consumable: any[];
  eventCategory: EventCategory;
  eventFormat: EventFormat;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}

export interface EventCategory {
  id: string;
  name: string;
  createdAt: string;
}

export interface EventFormat {
  id: string;
  name: string;
  createdAt: string;
}
