import { DataTypes } from 'sequelize';
import Model from '../sequelize';

// 参考图
const Reference = Model.define('Reference', {
  referenceId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  /**
   * 客户配置图片地址
   */
  fileUrl: { type: DataTypes.STRING },
  /**
   * 文件类型0: images, 1: pdf
   */
  fileType: { type: DataTypes.INTEGER },
  /**
   * 云地址
   */
  syncFileUrl: { type: DataTypes.STRING },
  syncFileName: {type: DataTypes.STRING}
});

export default Reference;
