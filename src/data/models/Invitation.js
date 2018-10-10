import { DataTypes } from 'sequelize';
import Model from '../sequelize';
// 邀请
const Invitation = Model.define('WindMachine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  url: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN },
});

export default Invitation;
