import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const Activity = Model.define('Activity', {
  activityId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * 0: create 1: remove, 2. revert 3: update
   */
  type: {type: DataTypes.INTEGER},
  /**
   * 0: photo, 1: label 2: video
   */
  category: {type: DataTypes.INTEGER},
  /**
   * labelId
   */
  labelId: {type: DataTypes.STRING},
  /**
   * photoId
   */
  photoId: {type: DataTypes.STRING},
  /**
   * projectId
   */
  projectId:  {type: DataTypes.STRING},
  /**
   * Role
   */
  role: {type: DataTypes.STRING},
  /**
   * user Id
   */
  createdById: {type:DataTypes.STRING},
  /**
   * user name
   */
  createdBy: {type: DataTypes.STRING},
  /**
   * spend time
   */
  time: {type: DataTypes.FLOAT},
  /**
   * count
   */
  count: {type: DataTypes.INTEGER},
  /**
   * Finished time
   */
  finishedTime: {type: DataTypes.BIGINT, defaultValue: 0},
})

export default Activity
