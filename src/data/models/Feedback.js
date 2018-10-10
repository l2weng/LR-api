import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Feedback = Model.define('WindVane', {
  windVaneId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  serialNumber: { type: DataTypes.STRING },
  factory: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default Feedback;
