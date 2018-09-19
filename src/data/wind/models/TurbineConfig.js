import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const TurbineConfig = Model.define('WindTurbineConfig', {
  turbineConfigId: {
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
  active: { type: DataTypes.INTEGER },
  vaneLength: { type: DataTypes.FLOAT },
  pixelLength: { type: DataTypes.FLOAT }
});

export default TurbineConfig;
