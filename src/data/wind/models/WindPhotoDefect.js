import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const WindPhotoDefect = Model.define('WindPhotoDefect', {
  linkId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  coordinates: { type: DataTypes.STRING(2048) },
  defectPosition: { type: DataTypes.STRING },
  defectSize: { type: DataTypes.STRING },
  suggestion: { type: DataTypes.STRING },
  defectUniqueNo: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING },
  defectType: { type: DataTypes.STRING },
});

export default WindPhotoDefect;
