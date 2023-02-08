import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../databaseInstance';

interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  id?: CreationOptional<string>
  email?: string
  tokenVersion?: number,
  name?: string,
  passwordHash?: string,
}

const User = db.sequelize.define<IUserModel>('User', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'UserID',
  },
  tokenVersion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'TokenVersion',
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: true,
    unique: true,
    field: 'Name',
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
    field: 'Email',
  },
  passwordHash: {
    type: DataTypes.STRING(72),
    allowNull: true,
    field: 'PasswordHash',
  },
}, {
  timestamps: false,
  modelName: 'User',
});

export default User;
