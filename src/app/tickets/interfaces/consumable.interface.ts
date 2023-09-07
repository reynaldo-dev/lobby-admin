export interface IConsumable {
  total: number;
  data: IConsumableData[];
}

export interface IConsumableData {
  id: string;
  isActive: boolean;
  isConsumed: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
  consumableId: string;
  user: User;
  consumable: Consumable;
  event: Event;
}

export interface Consumable {
  name: string;
}

export interface Event {
  title: string;
  description: string;
  status: string;
  place: string;
  dateTime: Date;
  link: string;
}

export interface User {
  isActive: boolean;
  email: string;
  name: string;
  lastname: string;
  rolId: string;
}
