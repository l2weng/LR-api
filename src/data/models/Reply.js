import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * 客服回复
 */
const Reply = Model.define('Reply', {
  replyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // todo 暂时简单做, 之后可以上rich editor
  message: { type: DataTypes.STRING(1000) },
});

export default Reply;
