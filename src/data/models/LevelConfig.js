import {DataTypes} from 'sequelize';
import Model from '../sequelize';

const LevelConfig = Model.define('LevelConfig', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  /**
   * score: user score to count the level, 1000: 青铜, 1100:青铜I....
   */
  score: {type: DataTypes.FLOAT},
  /**
   * Lv
   */
  level: {type: DataTypes.INTEGER},
  /**
   * Lv title
   */
  levelTitle: {type: DataTypes.STRING},
  /**
   * type 0: User level, 1: Team level
   */
  type: {type: DataTypes.INTEGER}
});

export default LevelConfig;
