import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const WindField = Model.define('WindField', {
  windFieldId: {
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
  serialNumber: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
  province: { type: DataTypes.STRING },
  fieldDefectCache: { type: DataTypes.TEXT },
});

export default WindField;
