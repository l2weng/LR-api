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

  title: { type: DataTypes.STRING },
  /**
   *  问题保存用的key
   */
  key: { type: DataTypes.STRING },
  /**
   *  true answer 保存的客户需要的value形式, e.g. 'Yes' '0'
   */
  trueAnswerVal: { type: DataTypes.STRING },
  /**
   *  false answer 保存的客户需要的value形式, e.g. 'NO' '1'
   */
  falseAnswerVal: { type: DataTypes.STRING },
});

export default LabelQuestion;
