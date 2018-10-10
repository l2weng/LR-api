import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserProjects = Model.define('UserProjects', {
  isOwner: { type: DataTypes.BOOLEAN },
});

export default UserProjects;
