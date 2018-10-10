import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserLogin = Model.define('WindPhotoDefect', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ip: { type: DataTypes.STRING },
  defectPosition: { type: DataTypes.STRING },
  defectSize: { type: DataTypes.STRING },
  suggestion: { type: DataTypes.STRING },
  defectUniqueNo: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING },
  defectType: { type: DataTypes.STRING },
});

export default UserLogin;
