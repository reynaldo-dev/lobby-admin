export interface IEventHistoryByUserResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: string;
  place: string;
  communityId: string;
  link: null;
  score: number;
  dateTime: string;
  createdBy: string;
  eventCategoryId: string;
  eventCategory: EventCategory;
  AssistanceTicket: AssistanceTicket[];
}

export interface AssistanceTicket {
  wasPresent: boolean;
}

export interface EventCategory {
  id: string;
  name: string;
  createdAt: string;
}
