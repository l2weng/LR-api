import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * 留言
 */
const Message = Model.define('Message', {
  messageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: { type: DataTypes.STRING },

  // todo 暂时简单做, 之后可以上rich editor
  content: { type: DataTypes.STRING(1000) },
});

export default Message;
