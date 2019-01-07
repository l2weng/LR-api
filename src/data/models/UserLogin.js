import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserLogin = Model.define('UserLogin', {
  userLoginId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  ip: { type: DataTypes.STRING },
});

export default UserLogin;
