import { DataTypes } from 'sequelize';
import Model from '../sequelize';
// 邀请
const Invitation = Model.define('Invitation', {
  invitationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * type:0 用加密url 发送到邮箱, 1: 用Random code 发送到phone
   */
  type: { type: DataTypes.INTEGER },
  /**
   * 邮箱用加密链接显示相应项目
   */
  projectSecretUrl: { type: DataTypes.STRING },
  /**
   * 加密口令
   */
  commandNumber: { type: DataTypes.STRING },
  /**
   * 邀请信状态 0:未查看,1:已查看, 2: 已加入, 2: 过期 (todo 当项目开始的时候, 邀请自动过期)
   */
  status: { type: DataTypes.INTEGER },
});

export default Invitation;
