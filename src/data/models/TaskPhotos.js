import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const TaskPhotos = Model.define('TaskPhotos', {
  photoStatus: { type: DataTypes.INTEGER, defaultValue: 0 },
  updatedTime: { type: DataTypes.BIGINT, defaultValue: 0 },
  spendTime: { type: DataTypes.INTEGER, defaultValue: 0 },
  projectId: { type: DataTypes.STRING },
  active:{type:DataTypes.INTEGER, defaultValue:0}
});

export default TaskPhotos;
