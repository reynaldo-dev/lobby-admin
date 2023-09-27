export interface IGetChallengeByIDResponse {
  id: string;
  title: string;
  description: string;
  initialDate: string;
  endDate: string;
  points: number;
  indications: string[];
  createdAt: string;
  coupons: number;
}
