import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const Label = Model.define('Label', {
  labelId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  x: {type: DataTypes.INTEGER, defaultValue: 0},
  y: {type: DataTypes.INTEGER, defaultValue: 0},
  angle: {type: DataTypes.INTEGER, defaultValue: 0},
  mirror: {type: DataTypes.BOOLEAN, defaultValue: false},
  width: {type: DataTypes.INTEGER, defaultValue: 0},
  height: {type: DataTypes.INTEGER, defaultValue: 0},
  id: {type: DataTypes.INTEGER, defaultValue: 0},
  /**
   * label type, 0: 矩形框, 1:......
   */
  type: {type: DataTypes.INTEGER},
  /**
   * 0: new, 1: updated, 2: removed
   */
  status: {type: DataTypes.INTEGER},
  userId: {type: DataTypes.STRING},
  updatedTime: {type: DataTypes.BIGINT, defaultValue: 0}
})

export default Label
