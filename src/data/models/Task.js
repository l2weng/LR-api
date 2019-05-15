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
  assignStatus: {type: DataTypes.BOOLEAN, defaultValue: false},

  /**
   * 0: open, 1: working, 2: Complete, 3: Confirmed
   * 0: 新建, 1: 工作中, 2: 待审核, 3: 已确认
   */
  workStatus:{type: DataTypes.INTEGER, defaultValue: 0},

  /**
   * task active status 0: active 1: deleted
   */
  active:{type:DataTypes.INTEGER, defaultValue:0}
})

export default Task
