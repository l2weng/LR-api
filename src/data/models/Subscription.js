import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * 留言
 */
const Subscription = Model.define('Subscription', {
  subscriptionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: { type: DataTypes.STRING },

});

export default Subscription;
