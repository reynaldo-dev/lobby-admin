export interface IChallenge {
  id: string;
  title: string;
  description: string;
  initialDate: string;
  endDate: string;
  points: number;
  coupons: number;
  availableCoupons: number;
}
