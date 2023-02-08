import User from './models/user.model';

export const syncModels = () => {
  User.sync();
};
