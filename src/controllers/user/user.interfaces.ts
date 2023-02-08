export interface IUser {
  id: string;
  tokenVersion?: number;
  name?: string;
  email: string;
  passwordHash: string;
}

// Determinate methods

export interface IUserRepository {
  createUserDatabaseEntry(data: ICreateUserDTO): Promise<IUserPayload | null>;
  updateUserDatabaseEntry(data: IUpdateUserDTO): Promise<IUser | null>;
  deleteUserDatabaseEntry(data: IDeleteUserDTO): Promise<string | null>;
}

// User Repository interfaces

export interface ICreateUserDTO {
  email: string;
  password: string;
}

export interface IUpdateUserDTO {
  id: string;
  action: 'ChangePassword' | 'ChangeEmail';
  email?: string;
  password?: string;
}

export interface IDeleteUserDTO {
  id: string;
}

// User Controller interfaces

export interface ICheckUserDTO {
  token: string
}

// Authenticate system interfaces

export interface IUserPayload {
  token: string;
  user: IUser;
}

export interface IUserInsideServiceAuthData {
  email: string;
  password: string;
}