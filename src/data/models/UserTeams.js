import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserTeams = Model.define('UserTeams', {
  isOwner: { type: DataTypes.BOOLEAN },
});

export default UserTeams;
