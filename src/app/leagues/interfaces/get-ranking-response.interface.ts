export interface IGetRankingResponse {
  id: string;
  name: string;
  lastname: string;
  email: string;
  picture: null;
  recognitionsReceivedCount: number;
  league: League | null;
}

export interface League {
  id: string;
  name: string;
  color: string;
}
