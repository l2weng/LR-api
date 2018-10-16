import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const MembershipConfig = Model.define('MembershipConfig', {
  membershipConfigId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  level: { type: DataTypes.INTEGER },
  monthPrice: { type: DataTypes.FLOAT },
  /**
   * 支付单位
   */
  unit: { type: DataTypes.INTEGER },
  yearPrice: { type: DataTypes.FLOAT },
  active: { type: DataTypes.INTEGER },
});

export default MembershipConfig;
