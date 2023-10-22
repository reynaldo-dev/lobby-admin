export interface IEventCardPayload {
  id: string;
  title: string;
  dateTime: string;
  status: string;
  community: ICommunity;
}

interface ICommunity {
  id: string;
  name: string;

  color: string;
}
