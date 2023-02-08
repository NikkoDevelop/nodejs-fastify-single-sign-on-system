export const swaggerOptions = {
  swagger: {
    info: {
      title: 'Documentation for SSO Service',
      version: '0.1.0',
    },
    host: 'Your host',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  hideUntagged: true,
  exposeRoute: true,
};

export const swaggerUiOptions = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false,
  },
  uiHooks: {
    onRequest (request: any, reply: any, next: () => void) {
      next();
    },
    preHandler (request: any, reply: any, next: () => void) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header,
};
