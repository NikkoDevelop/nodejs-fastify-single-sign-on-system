import isEmail from 'isemail';
import bcrypt from 'bcrypt';

import { UserModel } from '../../database/models/models';
import { createToken } from '../../integrations/jwt/jwt';
import { logger } from '../../logs/logger';
import { PASS_HASH_SALT } from '../../configs/config';
import { ICreateUserDTO, IDeleteUserDTO, IUpdateUserDTO, IUser, IUserPayload, IUserRepository } from './user.interfaces';

export const UserRepository: IUserRepository = {
  async createUserDatabaseEntry (data: ICreateUserDTO): Promise<IUserPayload | null> {
    try {
      const existingUser = await UserModel.findOne({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        throw new Error('This email is already exist');
      }

      if (!isEmail.validate(data.email)) {
        throw new Error('Invalid email');
      }

      const newUser = await UserModel.create({
        email: data.email,
        passwordHash: data.password,
      });

      const token = createToken(newUser.dataValues as IUser);

      logger.info(`User was created (id: ${newUser.dataValues.id})`);

      return {
        token,
        user: newUser.dataValues as IUser,
      };
    } catch (error) {
      logger.error(`User create has error: ${error}`);

      return null;
    }
  },

  async updateUserDatabaseEntry (data: IUpdateUserDTO): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({
        where: {
          id: data.id,
        },
      });

      if (!user) {
        logger.warn('User is not finded');

        return null;
      }

      switch (data.action) {
        case 'ChangeEmail':
          if (data.email) {
            await user.set({
              email: data.email,
            });

            await user.save();

            return user as IUser;
          }
          return null;

        case 'ChangePassword':
          if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, PASS_HASH_SALT);

            user.set({
              passwordHash: hashedPassword,
            });

            await user.save();

            return user as IUser;
          }
          return null;

        default:
          logger.error('User update has error');

          return null;
      }
    } catch (error) {
      logger.error(`User update has error: ${error}`);

      return null;
    }
  },

  async deleteUserDatabaseEntry (data: IDeleteUserDTO): Promise<string | null> {
    try {
      const user = await UserModel.findOne({
        where: {
          id: data.id,
        },
      });

      if (!user) {
        logger.warn('User is not finded');

        return 'User is not finded';
      }

      user.destroy();

      return 'User deleted';
    } catch (error) {
      logger.error(`User update has error: ${error}`);

      return null;
    }
  },
};
