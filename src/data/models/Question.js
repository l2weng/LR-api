import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Question = Model.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  title: { type: DataTypes.STRING },
  key: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default Question;
