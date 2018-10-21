import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * Project type is true false question
 */
const QuestionItem = Model.define('QuestionItem', {
  questionItemId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  /**
   * 标注目标title
   */
  targetTitle: { type: DataTypes.STRING },
  /**
   * target type. e.g. 'Polygon', 'Point', 'Line', 'Rectangle', //todo pixel
   */
  targetType: { type: DataTypes.INTEGER },
  /**
   * 标注颜色
   */
  targetColor: { type: DataTypes.STRING },

  /**
   * 是不是有标注完选项提示
   */
  hasOptions: { type: DataTypes.BOOLEAN, defaultValue: false },
  /**
   * 问题项单选选项题目
   */
  optionTitle: { type: DataTypes.STRING },
  /**
   *  问题项type, 0:text, 1: Radio, 2: checkbox
   */
  optionType: { type: DataTypes.INTEGER },

  /**
   *问题选项JSON, e.g. {type:'text',options:'is a car'} or {type:'radio',options:['red','blue','green']}
   */
  options: { type: DataTypes.STRING },

  /**
   * 快捷键
   */
  keymap: { type: DataTypes.STRING },
});

export default QuestionItem;
