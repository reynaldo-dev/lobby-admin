export interface IGetRedeemablesResponse {
  id: string;
  name: string;
  description: string;
  picture: null;
  required_token_id: string;
  required_token_amount: number;
  createdAt: string;
  stock: number;
  token: Token;
}

export interface Token {
  id: string;
  name: string;
  createdAt: string;
  required_points: number;
}
