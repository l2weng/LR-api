import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Task = Model.define('Task', {
  taskId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  type: { type: DataTypes.INTEGER },

  /**
   * progress 进度最大值100
   */
  progress: { type: DataTypes.INTEGER },
});

export default Task;
