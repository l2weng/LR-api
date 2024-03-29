import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserTeams = Model.define('UserTeams', {
  /**
   * tell team belongs to who
   */
  isOwner: { type: DataTypes.BOOLEAN , defaultValue: 0 },
});

export default UserTeams;
