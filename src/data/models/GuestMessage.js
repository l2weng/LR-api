import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * 客户回馈
 */
const GuestMessage = Model.define('Feedback', {
  guestMessageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  subject: { type: DataTypes.STRING },
  number: { type: DataTypes.STRING},
  email: { type: DataTypes.STRING},
  // todo 暂时简单做, 之后可以上rich editor
  message: { type: DataTypes.STRING(1000) },
});

export default GuestMessage;
