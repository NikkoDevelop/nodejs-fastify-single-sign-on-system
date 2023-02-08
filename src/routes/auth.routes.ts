import { FastifyInstance } from 'fastify';
import { loginUserController, registerUserController } from '../controllers/auth/auth.controller';
import { LoginSchema, RegisterSchema } from '../lib/schemas/auth.swagger.schema';

const authRouter = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/register', { schema: RegisterSchema }, registerUserController);

  fastify.post('/login', { schema: LoginSchema }, loginUserController);

  next();
};

export default authRouter;
