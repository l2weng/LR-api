import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const WindMachine = Model.define('WindMachine', {
  windMachineId: {
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
  factory: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
  turbineConfigName:{ type: DataTypes.STRING },
  exportStatus: { type: DataTypes.INTEGER },
  exportedWordUrl:{ type: DataTypes.STRING },
});

export default WindMachine;
