import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * 判断是否有定义类的, 比如有没有空缺排面, 照片是不是旋转, 照片质量好不好
 */
const QuestionClassification = Model.define('QuestionClassification', {
  questionClassificationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  /**
   * title
   */
  title: { type: DataTypes.STRING },
  /**
   * type, 0:text, 1: Radio, 2: checkbox
   */
  type: { type: DataTypes.INTEGER },

  /**
   * options JSON, e.g. {type:'text',options:'is a car'} or {type:'radio',options:['red','blue','green']}
   */
  options: { type: DataTypes.STRING },

  /**
   * 快捷键
   */
  keymap: { type: DataTypes.STRING },
});

export default QuestionClassification;
