import { FastifySchema } from 'fastify';

export const RegisterSchema: FastifySchema = {
  description: 'User register',
  tags: ['AuthRoutes'],
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    required: ['email', 'password']
  },
  response: {
    400: {
      description: 'Failed response',
      type: 'string'
    },
    201: {
      description: 'Success response',
      type: 'object',
      properties: {
        token: {
          type: 'string'
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            tokenVersion: {
              type: 'number'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            passwordHash: {
              type: 'string'
            }
          }
        }
      }

    }
  }
};

export const LoginSchema: FastifySchema = {
  description: 'User login',
  tags: ['AuthRoutes'],
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    required: ['email', 'password']
  },
  response: {
    400: {
      description: 'Failed response',
      type: 'string'
    },
    200: {
      description: 'Success response',
      type: 'object',
      properties: {
        token: {
          type: 'string'
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            tokenVersion: {
              type: 'number'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            passwordHash: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};
