export interface IGetChallengeByIDResponse {
  id: string;
  title: string;
  description: string;
  initialDate: string;
  endDate: string;
  credits: number;
  indications: string[];
  createdAt: string;
  coupons: number;
  eventCategoryId: string;
}
