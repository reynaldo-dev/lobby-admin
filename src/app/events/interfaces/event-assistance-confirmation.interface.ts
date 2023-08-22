export interface IEventAssistanceConfirmation {
  confirmations: number;
  users: IUserAssistanceConfirmation[];
  consumables: IConsumableEventConfirmation[];
}

export interface IUserAssistanceConfirmation {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface IConsumableEventConfirmation {
  name: string;
  id: string;
}
