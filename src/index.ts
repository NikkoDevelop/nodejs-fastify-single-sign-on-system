import type { FastifyCookieOptions } from '@fastify/cookie';

import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';

import { COOKIE_SECRET, SERVER_HOST, SERVER_PORT } from './configs';
import database from './database/databaseInstance';
import { syncModels } from './database/syncModels';
import { swaggerOptions, swaggerUiOptions } from './lib/swagger';
import { logger } from './logs/logger';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';

const server = fastify();

const whitelist: string[] = [
  'http://localhost:3000'
];

(async () => {
  await server.register(cookie, {
    secret: COOKIE_SECRET,
    parseOptions: {}
  } as FastifyCookieOptions);

  await server.register(cors, {
    origin: (origin, callback) => {
      if (origin === undefined) {
        callback(null, false);
      } else if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  });

  await server.register(fastifySwagger, swaggerOptions);
  await server.register(fastifySwaggerUi, swaggerUiOptions);

  await server.register(authRouter, {
    prefix: '/sso/auth'
  });

  await server.register(userRouter, {
    prefix: '/sso/user'
  });

  await server.ready().then(() => {
    logger.info('Successfully booted!');
  }, (err) => {
    logger.error('an error happened', err);
  });
})();

(async () => {
  try {
    await database.sequelize.authenticate().then(() => {
      logger.info('Connection has been established successfully.');

      syncModels();
    }).catch((error) => {
      logger.error(`Unable to connect to the database: ${error}`);
    });
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);

    throw new Error(error as string);
  }
  try {
    await server.ready();
    server.swagger();

    server.listen({
      port: Number(SERVER_PORT),
      host: SERVER_HOST
    }, (err) => {
      if (err) {
        logger.error(err?.stack);
      }
      logger.info(`Server started at http://${SERVER_HOST}:${SERVER_PORT}`);
    });
  } catch (error) {
    logger.error(`Unable to connect the server: ${error}`);

    throw new Error(error as string);
  }
})();
