import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { FastifyReply, FastifyRequest } from 'fastify';

export const swaggerOptions = {
  swagger: {
    info: {
      title: 'Documentation for SSO Service',
      version: '0.1.0'
    },
    host: 'Your host',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  hideUntagged: true,
  exposeRoute: true
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false
  },
  uiHooks: {
    onRequest (request: FastifyRequest, reply: FastifyReply, next: () => void) {
      next();
    },
    preHandler (request: FastifyRequest, reply: FastifyReply, next: () => void) {
      next();
    }
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header
};
