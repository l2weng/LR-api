import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Membership = Model.define('Membership', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  type: { type: DataTypes.STRING },
  /**
   * 会员权益项目参与人数
   */
  accounts:{type:DataTypes.INTEGER},
  /**
   * 会员权益项目数
   */
  projectCounts:{type:DataTypes.INTEGER}
});

export default Membership;
