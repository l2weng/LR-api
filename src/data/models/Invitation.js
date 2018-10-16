import { DataTypes } from 'sequelize';
import Model from '../sequelize';
// 邀请
const Invitation = Model.define('Invitation', {
  invitationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  url: { type: DataTypes.STRING },
  /**
   * 邀请信状态 0:未使用, 1: 已激活, 2: 过期
   */
  status: { type: DataTypes.INTEGER },
});

export default Invitation;
