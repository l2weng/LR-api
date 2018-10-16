import {DataTypes} from 'sequelize';
import Model from '../sequelize';

const AuthConfig = Model.define('AuthConfig', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * 权限名称,如: 'team members 数量'
   */
  name: {type: DataTypes.STRING},
  /**
   * 数量
   */
  counts: {type: DataTypes.INTEGER},
  /**
   * 创建人 ID
   */
  createdBy: {type: DataTypes.STRING},
  /**
   * 更新人 ID
   */
  modifiedBy: {type: DataTypes.STRING}
});

export default AuthConfig;
