import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * 客户回馈
 */
const Feedback = Model.define('Feedback', {
  feedBackId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: { type: DataTypes.STRING },

  // todo 暂时简单做, 之后可以上rich editor
  message: { type: DataTypes.STRING(1000) },
});

export default Feedback;
