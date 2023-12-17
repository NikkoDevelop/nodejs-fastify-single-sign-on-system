import jwt from 'jsonwebtoken';

import { JWT_REFRESH_SECRET, JWT_SECRET } from '../../configs';
import { IUser } from '../../controllers/user/user.interfaces';

export const createToken = (user: IUser): string => {
  return jwt.sign({
    userId: user.id,
    iss: 'Issuer'
  }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
};

export const createRefreshToken = (user: IUser) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    JWT_REFRESH_SECRET
  );
};
