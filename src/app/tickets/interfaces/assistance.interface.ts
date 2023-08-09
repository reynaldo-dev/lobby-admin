export interface IAssistance {
  total: number;
  data: IAssistanceData[];
}

export interface IAssistanceData {
  id: string;
  isActive: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
  user: IUser;
  event: IEvent;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: Date;
  place: string;
  communityId: string;
  score: null;
  dateTime: Date;
  eventCategoryId: null;
}

export interface IUser {
  id: string;
  isActive: boolean;
  email: string;
  name: string;
  lastname: string;
  createdAt: Date;
  rolId: string;
}
