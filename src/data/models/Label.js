import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Label = Model.define('Label', {
  labelId: {
    type: DataTypes.FLOAT,
    autoIncrement: true,
    primaryKey: true,
  },

  x: { type: DataTypes.INTEGER, defaultValue: 0 },
  y: { type: DataTypes.INTEGER, defaultValue: 0 },
  /**
   * label type, 0: 矩形框, 1:......
   */
  type: { type: DataTypes.INTEGER },
  /**
   * 0: new, 1: updated, removed
   */
  status: { type: DataTypes.INTEGER}
});

export default Label;
