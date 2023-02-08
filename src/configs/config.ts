import {
  COOKIE_SECRET,
  DB_DIALECT,
  DB_HOST,
  DB_LOGGING,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_USER_PASS,
  HASH_SALT,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
  PORT,
  SERVICE_NAME,
  SVR_HOST,
} from './environments';

export const SERVER_PORT = process.env.SERVER_PORT as string || PORT;
export const SERVER_HOST = process.env.SERVER_HOST as string || SVR_HOST;
export const SERVER_SERVICE_NAME = process.env.SERVICE_NAME as string || SERVICE_NAME;
export const DATABASE_URL = process.env.DATABASE_URL as string || `${DB_DIALECT}://${DB_USER}:${DB_USER_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
export const DATABASE_DIALECT = process.env.DATABASE_DIALECT as string || DB_DIALECT;
export const DATABASE_NAME = process.env.DATABASE_NAME as string || DB_NAME;
export const DATABASE_PORT = process.env.DATABASE_PORT as string || DB_PORT;
export const DATABASE_HOST = process.env.DATABASE_HOST as string || DB_HOST;
export const DATABASE_USER = process.env.DATABASE_USER as string || DB_USER;
export const DATABASE_USER_PASS = process.env.DATABASE_USER_PASS as string || DB_USER_PASS;
export const DATABASE_LOGGING = process.env.DATABASE_LOGGING as string || DB_LOGGING;

export const PASS_HASH_SALT = process.env.HASH_SALT as string || HASH_SALT;
export const JWT_SECRET_SALT = process.env.JWT_SECRET as string || JWT_SECRET;
export const JWT_REFRESH_SALT = process.env.JWT_REFRESH_SECRET as string || JWT_REFRESH_SECRET;
export const COOKIE_SECRET_SALT = process.env.COOKIE_SECRET as string || COOKIE_SECRET;

export const AUTH_GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_CLIENT_ID as string;
export const AUTH_GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_CLIENT_SECRET as string;
export const AUTH_GOOGLE_REDIRECT_URL = process.env.AUTH_GOOGLE_REDIRECT_URL as string;
export const AUTH_YANDEX_CLIENT_ID = process.env.AUTH_YANDEX_CLIENT_ID as string;
export const AUTH_YANDEX_CLIENT_SECRET = process.env.AUTH_YANDEX_CLIENT_SECRET as string;
export const AUTH_YANDEX_REDIRECT_URL = process.env.AUTH_YANDEX_REDIRECT_URL as string;
export const AUTH_VK_CLIENT_ID = process.env.AUTH_VK_CLIENT_ID as string;
export const AUTH_VK_CLIENT_SECRET = process.env.AUTH_VK_CLIENT_SECRET as string;
export const AUTH_VK_REDIRECT_URL = process.env.AUTH_VK_REDIRECT_URL as string;
