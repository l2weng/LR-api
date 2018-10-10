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
  unit: { type: DataTypes.INTEGER },
  yearPrice: { type: DataTypes.FLOAT },
  active: { type: DataTypes.INTEGER },
});

export default MembershipConfig;
