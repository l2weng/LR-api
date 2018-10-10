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
   * 会员权益通过会员购买时组合而成的JSON file
   */
  memberRights: { type: DataTypes.STRING(1000) },
});

export default Membership;
