export interface IUserFields {
  login: string;
  password: string;
}

export interface IUserData {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
}

export interface IUserCreateData {
  name: string;
  avatar: string;
}

export type IUserEditData = Partial<IUserCreateData>;