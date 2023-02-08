import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../configs/config';

const sequelize = new Sequelize(DATABASE_URL, {
  timezone: '+00:00',
  define: {
    timestamps: false,
  },
});

const db = {
  sequelize,
  Sequelize,
};

export default db;
