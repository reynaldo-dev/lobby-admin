export interface IGivenRecognitionsResponse {
  id: string;
  userTargetId: string;
  userSourceId: string;
  description: string;
  points: number;
  userSource: User;
  userTarget: User;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  picture: null;
}
