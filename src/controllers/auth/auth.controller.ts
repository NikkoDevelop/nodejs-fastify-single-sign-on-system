import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';

import { HASH_SALT } from '../../configs';
import { createRefreshToken } from '../../integrations/jwt/jwt';
import { insideServiceSignInUser } from '../user/user.controller';
import { UserRepository } from '../user/user.repository';
import { ILoginUserDTO, IRegisterUserDTO } from './auth.interfaces';

export const loginUserController = async (
  req: FastifyRequest<{ Body: ILoginUserDTO }>,
  reply: FastifyReply
) => {
  try {
    const body = req.body;

    const payload = await insideServiceSignInUser(body);

    if (payload === null) {
      reply.status(400).send('Error! User was not created');
    } else {
      reply.cookie(
        'jid',
        createRefreshToken(payload.user),
        {
          httpOnly: true,
          secure: process.env.ENV_NAME === 'PRODUCTION'
        }
      );
    }

    reply.status(200).send(payload);
  } catch (error) {
    reply.status(400).send(`Error! ${error}`);
  }
};

export const registerUserController = async (
  req: FastifyRequest<{ Body: IRegisterUserDTO }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const body = req.body;

    if (!body.email || !body.password) {
      reply.status(400).send('Error! Please send email and password in request body');
    }

    const hashedPassword = await bcrypt.hash(body.password, Number(HASH_SALT));

    const payload = await UserRepository.createUserDatabaseEntry({
      email: body.email,
      password: hashedPassword
    });

    if (!payload) {
      reply.status(400).send('Error! User was not created');
    } else {
      reply.cookie(
        'jid',
        createRefreshToken(payload.user),
        {
          httpOnly: true,
          secure: process.env.ENV_NAME === 'PRODUCTION'
        }
      );
    }

    reply.status(201).send(payload);
  } catch (error) {
    reply.status(400).send(`Error! ${error}`);
  }
};
