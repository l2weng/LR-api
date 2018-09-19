import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const RoutingInspect = Model.define('WindRoutingInspect', {
  routingInspectId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  inspectDate:{
    type: DataTypes.FLOAT,
  },
  factory: { type: DataTypes.STRING },
  url: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default RoutingInspect;
