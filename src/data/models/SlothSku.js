import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const SlothSku = Model.define('SlothSku', {
  slothSkuId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  skuId: {type:DataTypes.INTEGER},
  row:  {type:DataTypes.INTEGER},
  col:  {type:DataTypes.INTEGER},
  count: {type:DataTypes.INTEGER, defaultValue:0},
  url:{type:DataTypes.STRING},
  type: {type:DataTypes.INTEGER},
});

export default SlothSku;
