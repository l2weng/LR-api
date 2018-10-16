import {DataTypes} from 'sequelize';
import Model from '../sequelize';

const Activity = Model.define('Activity', {
  activityId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * 0: submitted 1: skipped, 2: reviewed
   */
  type: {type: DataTypes.STRING},
  createdBy: {type: DataTypes.STRING},
  /**
   * data set name
   */
  dataSetName: {type: DataTypes.STRING},
  /**
   * calc with seconds. eg. 10, 20, 45
   */
  time:{type:DataTypes.FLOAT}
});

export default Activity;
