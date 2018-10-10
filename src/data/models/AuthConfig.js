import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const AuthConfig = Model.define('AuthConfig', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  level: { type: DataTypes.INTEGER },
  type: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default AuthConfig;
