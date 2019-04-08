import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const SlothKong = Model.define('SlothKong', {
  slothKongId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  row: { type: DataTypes.INTEGER },
  col: { type: DataTypes.INTEGER },
  type: { type: DataTypes.INTEGER }

});

export default SlothKong;
