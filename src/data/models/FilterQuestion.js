import { DataTypes } from 'sequelize';
import Model from '../sequelize';

/**
 * Project type true false question
 */
const FilterQuestion = Model.define('FilterQuestion', {
  filterQuestionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  title: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default FilterQuestion;
