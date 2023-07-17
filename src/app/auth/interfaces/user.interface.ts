export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface User {
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}
