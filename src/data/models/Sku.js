import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Sku = Model.define('Sku', {
  skuId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  serialNumber: { type: DataTypes.STRING },
});

export default Sku;
