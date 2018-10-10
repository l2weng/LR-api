import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Photo = Model.define('WindDefectType', {
  defectTypeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is a required field',
      },
    },
  },
  suggestion: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default Photo;
