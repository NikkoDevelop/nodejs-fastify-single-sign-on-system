import { Sequelize } from 'sequelize';

import { getDatabaseUrl } from './instance';

const sequelize = new Sequelize(getDatabaseUrl(), {
  timezone: '+00:00',
  define: {
    timestamps: false
  }
});

const database = {
  sequelize,
  Sequelize
};

export default database;
