export interface IUser {
  id: string;
  tokenVersion?: number;
  name?: string;
  email: string;
  passwordHash: string;
}

export interface IUserRepository {
  createUserDatabaseEntry(data: ICreateUserDTO): Promise<IUserPayload | null>;
  updateUserDatabaseEntry(data: IUpdateUserDTO): Promise<IUser | null>;
  deleteUserDatabaseEntry(data: IDeleteUserDTO): Promise<null | string>;
}

export interface ICreateUserDTO {
  email: string;
  password: string;
}

export interface IUpdateUserDTO {
  id: string;
  action: 'ChangeEmail' | 'ChangePassword';
  email?: string;
  password?: string;
}

export interface IDeleteUserDTO {
  id: string;
}

export interface ICheckUserDTO {
  token: string
}

export interface IUserPayload {
  token: string;
  user: IUser;
}

export interface IUserInsideServiceAuthData {
  email: string;
  password: string;
}
