import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const PremiseConfig = Model.define('WindPremiseConfig', {
  premiseConfigId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  serverName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'serverName is a required field',
      },
    },
  },
  serverAddress: { type: DataTypes.STRING },
  version: { type: DataTypes.STRING },
  port: { type: DataTypes.STRING },
  operationSystem:{type:DataTypes.STRING},
  details:{ type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default PremiseConfig;
