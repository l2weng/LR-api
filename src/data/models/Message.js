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

  /**
   * type: 0:invitations, 1:system...
   */
  type: { type: DataTypes.INTEGER},

  /**
   * 0: unread, 1: read
   */
  status: {type: DataTypes.INTEGER},

  /**
   * 0: yes, 1: no
   */
  result: {type:DataTypes.INTEGER},
  /**
   * Created by
   */
  createdBy: {type:DataTypes.STRING},
  /**
   * Created by user name
   */
  createdByName: {type:DataTypes.STRING},
  invited:  {type:DataTypes.STRING},
  remarks: {type:DataTypes.STRING(1000)}
});

export default Message;
