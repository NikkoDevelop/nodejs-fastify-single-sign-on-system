import { FastifyInstance } from 'fastify';
import { checkUserController, deleteUserController, updateUserController } from '../controllers/user/user.controller';
import { UserCheckSchema, UserDeleteSchema, UserUpdateSchema } from '../lib/schemas/user.swagger.schema';

const userRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/check', { schema: UserCheckSchema }, checkUserController);

  fastify.patch('/update', { schema: UserUpdateSchema }, updateUserController);

  fastify.delete('/delete', { schema: UserDeleteSchema }, deleteUserController);

  next();
};

export default userRouter;
