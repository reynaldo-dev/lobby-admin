export interface ICreateRedeemablePayload {
  name: string;
  description: string;
  required_token_amount: number;
  required_token_id: string;
  stock: number;
}
