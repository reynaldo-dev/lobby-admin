export interface IAssistance {
  total: number;
  data: IAssistanceData[];
}

export interface IAssistanceData {
  id: string;
  isActive: boolean;
  wasPresent: boolean;
  scannedAt: null;
  createdAt: Date;
  eventId: string;
  userId: string;
  qrCodeId: null;
  user: User;
  event: Event;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: Date;
  place: string;
  communityId: string;
  link: null;
  score: number;
  dateTime: Date;
  eventCategoryId: string;
}

export interface User {
  id: string;
  isActive: boolean;
  email: string;
  name: string;
  lastname: string;
  createdAt: Date;
  rolId: string;
}
