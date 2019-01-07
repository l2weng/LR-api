import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const TaskPhotos = Model.define('TaskPhotos', {
  /**
   * Task 同步状态 0:未开始同步, 1: 同步中, 2: 同步成功, 3: 同步失败
   */
  syncStatus: { type: DataTypes.INTEGER },
});

export default TaskPhotos;
