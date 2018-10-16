import {DataTypes} from 'sequelize';
import Model from '../sequelize';

const Photo = Model.define('Photo', {

  photoId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * 图片已经同步上云
   */
  syncedWithCloud: {type: DataTypes.BOOLEAN, defaultValue: false},
  /**
   * 客户配置图片地址
   */
  fileUrl: {type: DataTypes.STRING},
  /**
   * 云地址
   */
  cloudUrl: {type: DataTypes.STRING},
  /**
   * 图片status, 0: 正常, 1: 删除
   */
  status: {type: DataTypes.INTEGER},
});

export default Photo;
