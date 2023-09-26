import { IChallenge } from './challenge.interface';

export interface IGetChallengesResponse {
  total: number;
  data: IChallenge[];
}
