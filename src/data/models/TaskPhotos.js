import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const TaskPhotos = Model.define('TaskPhotos', {
  photoStatus: {type: DataTypes.INTEGER, defaultValue: 0},
});

export default TaskPhotos;
