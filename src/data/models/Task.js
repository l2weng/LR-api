import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const Task = Model.define('Task', {
  taskId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: {type: DataTypes.STRING},

  /**
   * type:0 means 基本标注类型, 1 means 可能对错类型
   */
  type: {type: DataTypes.INTEGER, defaultValue: 0},

  /**
   * 本地taskId (listId)
   */
  localTaskId:{type: DataTypes.INTEGER},

  /**
   * progress 进度最大值100
   */
  progress: {type: DataTypes.INTEGER, defaultValue: 0, max: 100},

  /**
   * 分配状态, false 未分配, true 已分配
   */
  assignStatus: {type: DataTypes.BOOLEAN, defaultValue: false}
})

export default Task
