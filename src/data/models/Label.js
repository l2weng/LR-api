import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Label = Model.define('Label', {
  id: {
    type: DataTypes.FLOAT,
    autoIncrement: true,
    primaryKey: true,
  },

  x: { type: DataTypes.INTEGER },
  y: { type: DataTypes.INTEGER },
});

export default Label;
