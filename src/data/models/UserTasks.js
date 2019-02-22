import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserTasks = Model.define('UserTasks', {
  projectId: { type: DataTypes.UUID },
});

export default UserTasks;
