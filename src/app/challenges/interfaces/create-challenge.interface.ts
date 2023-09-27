export interface ICreateChallenge {
  title: string;
  description: string;
  initialDate: string;
  endDate: string;
  points: number;
  coupons: number;
  indications: string[];
}
