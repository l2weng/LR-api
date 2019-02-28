import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const Photo = Model.define('Photo', {
  photoId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * 客户配置图片地址 e.g. /users/louis/Desktop/1.jpg
   */
  fileUrl: {type: DataTypes.STRING},
  /**
   * 图片status, 0: 正常, 1: 删除
   */
  status: {type: DataTypes.INTEGER, defaultValue: 0},

  /**
   * 图片同步状态
   */
  syncStatus: {type: DataTypes.BOOLEAN, defaultValue: false},
  /**
   * 云地址
   */
  syncFileUrl: {type: DataTypes.STRING},
  syncFileName: {type: DataTypes.STRING},
  size: {type: DataTypes.INTEGER},
  width: {type: DataTypes.INTEGER},
  height: {type: DataTypes.INTEGER},
  mimeType: {type: DataTypes.STRING},
  createdBy: {type: DataTypes.STRING},
  orientation: {type: DataTypes.INTEGER},
})

export default Photo
