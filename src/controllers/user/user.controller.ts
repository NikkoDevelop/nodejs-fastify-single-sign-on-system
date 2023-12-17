import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../../configs';
import { UserModel } from '../../database/models/models';
import { createToken } from '../../integrations/jwt/jwt';
import {
  ICheckUserDTO,
  IDeleteUserDTO,
  IUpdateUserDTO,
  IUser,
  IUserInsideServiceAuthData,
  IUserPayload
} from './user.interfaces';
import { UserRepository } from './user.repository';

export const getToken = (user: IUser): string => {
  return jwt.sign({
    email: user.email,
    sub: user.id
  }, JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256'
  });
};

export const findUserByToken = async (authorization: string): Promise<IUser | null> => {
  if (!authorization) {
    return null;
  }

  try {
    const token: JwtPayload | string = jwt.verify(authorization.replace('Bearer ', ''), JWT_SECRET);

    if (typeof token === 'string') {
      return null;
    }

    if (!token.userId) {
      return null;
    }
    const user = await UserModel.findOne({ where: { id: token.userId } });

    return user?.dataValues as IUser;
  } catch (error) {
    return null;
  }
};

export const insideServiceSignInUser = async (data: IUserInsideServiceAuthData): Promise<IUserPayload | null> => {
  try {
    const user = await UserModel.findOne({
      where: {
        email: data.email
      }
    }) as IUser;

    if (!user) {
      throw new Error('User with this email is not existed');
    } else {
      const passwordMatch = await bcrypt.compare(data.password, user.passwordHash as string);

      if (!passwordMatch) {
        throw new Error('Incorrect email or password');
      }

      const token = createToken(user as IUser);

      return { token, user };
    }
  } catch (error) {
    throw new Error(`Error! ${error}`);
  }
};

export const checkUserController = async (req: FastifyRequest<{ Body: ICheckUserDTO }>, reply: FastifyReply) => {
  try {
    const body = req.body;

    if (!body.token) {
      reply.status(400).send('Error! Please send token in request body');
    }

    const payload = await findUserByToken(body.token);

    if (payload === null) {
      reply.status(400).send('Error! User is not found');
    }

    reply.status(200).send(payload);
  } catch (error) {
    reply.status(400).send(`Error! ${error}`);
  }
};

export const updateUserController = async (req: FastifyRequest<{ Body: IUpdateUserDTO }>, reply: FastifyReply) => {
  try {
    const body = req.body;

    if (!body.action || !body.id) {
      reply.status(400).send('Error! Please send action and id in request body');
    }

    const user = await UserRepository.updateUserDatabaseEntry(body);

    if (!user) {
      reply.status(400).send('Error! User is not modified');
    }

    reply.status(200).send(user);
  } catch (error) {
    reply.status(400).send(`Error! ${error}`);
  }
};

export const deleteUserController = async (req: FastifyRequest<{ Body: IDeleteUserDTO }>, reply: FastifyReply) => {
  try {
    const body = req.body;

    if (!body.id) {
      reply.status(400).send('Error! Please send id in request body');
    }

    const result = await UserRepository.deleteUserDatabaseEntry(body);

    if (!result) {
      reply.status(400).send('Error! User is not deleted');
    }

    if (result === 'User deleted') {
      reply.status(200).send(result);
    } else {
      reply.status(400).send('Error! User is not deleted');
    }
  } catch (error) {
    reply.status(400).send(`Error! ${error}`);
  }
};
