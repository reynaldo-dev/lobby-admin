import { IToken } from './token.interface';

export interface IGetTokensResponse {
  ok: boolean;
  tokens: IToken[];
}
