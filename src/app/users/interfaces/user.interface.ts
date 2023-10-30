export interface IUser {
  total: number;
  data: UserData[];
}

export interface UserData {
  id?: string;
  isActive?: boolean;
  email?: string;
  name?: string;
  lastname?: string;
  createdAt?: Date;
  rolId?: string;
  rol?: Rol;
  phone?: string;
  department?: string;
  city?: string;
  picture?: string;
  workplace?: string;
  enterprise_id?: string;
}

export interface Rol {
  id: string;
  role: string;
}
