import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const LevelConfig = Model.define('Level', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  /**
   * score: user score to count the level
   */
  score: { type: DataTypes.FLOAT },
  /**
   * Lv
   */
  level: { type: DataTypes.INTEGER },
});

export default LevelConfig;
