import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserTasks = Model.define('UserTasks', {
  projectId: { type: DataTypes.UUID },
  taskStatus: {type: DataTypes.INTEGER, defaultValue: 0},
});

export default UserTasks;
