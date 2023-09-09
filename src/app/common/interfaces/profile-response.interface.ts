// Generated by https://quicktype.io

export interface IProfileResponse {
  id: string;
  isActive: boolean;
  email: string;
  department: null;
  city: null;
  phone: null;
  name: string;
  lastname: string;
  createdAt: string;
  rolId: string;
  rol: Rol;
  picture: string | null;
}

export interface Rol {
  id: string;
  role: string;
  createdAt: string;
}
