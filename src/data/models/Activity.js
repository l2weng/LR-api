import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Activity = Model.define('Activity', {
  activityId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * 0: create 1: delete, 2: update
   */
  type: { type: DataTypes.INTEGER },
  /**
   * 0: project, 1: task, 2: photo, 3: sku, 4: label
   */
  category: { type: DataTypes.INTEGER},
  /**
   * Enum: projectId, taskId, photoId, skuId, labelId
   */
  categoryId: { type: DataTypes.STRING},
  /**
   * user Id
   */
  createdBy: { type: DataTypes.STRING },
  /**
   * calc with seconds. eg. 10, 20, 45
   */
  time: { type: DataTypes.FLOAT },
});

export default Activity;
