import { FastifySchema } from 'fastify';

export const UserUpdateSchema: FastifySchema = {
  description: 'User update',
  tags: ['UserRoutes'],
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      action: {
        type: 'string',
        enum: ['ChangePassword', 'ChangeEmail']
      },
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    required: ['id', 'action']
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

export const UserDeleteSchema: FastifySchema = {
  description: 'User delete',
  tags: ['UserRoutes'],
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      }
    },
    required: ['id']
  },
  response: {
    400: {
      description: 'Failed response',
      type: 'string'
    },
    200: {
      description: 'Success response',
      type: 'string'
    }
  }
};

export const UserCheckSchema: FastifySchema = {
  description: 'Check user',
  tags: ['UserRoutes'],
  body: {
    type: 'object',
    properties: {
      token: {
        type: 'string'
      }
    },
    required: ['token']
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
};
