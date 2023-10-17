export interface ITradeHistory {
  id: string;
  createdAt: string;
  user: User;
  redeemedItem: RedeemedItem;
}

export interface RedeemedItem {
  id: string;
  name: RedeemedItemName;
}

export enum RedeemedItemName {
  TShirt = 'T-shirt',
}

export interface User {
  id: string;
  name: UserName;
  lastname: Lastname;
}

export enum Lastname {
  CarranzaRivas = 'Carranza Rivas',
}

export enum UserName {
  MarioErnesto = 'Mario Ernesto',
}
