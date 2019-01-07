import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * Project type is Label question
 */
const LabelQuestion = Model.define('LabelQuestion', {
  labelQuestionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  /**
   * 缓存 QuestionItem 和 QuestionClassification的集合
   */
  cacheQuestions: { type: DataTypes.TEXT },
  /**
   * 参考word 或者 pdf url
   */
  Instructions: { type: DataTypes.STRING },
});

export default LabelQuestion;
