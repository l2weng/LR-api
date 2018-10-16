import {DataTypes} from 'sequelize';
import Model from '../sequelize';

const Team = Model.define('Team', {
  teamId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: {type: DataTypes.STRING},
  /**
   * 0: Pure Local team, 1: Pure www team, 2: mixed team
   */
  type: {type: DataTypes.INTEGER},
  icon: {type: DataTypes.STRING},
  /**
   * team members count calc from membership
   */
  accounts: {type: DataTypes.INTEGER},
  /**
   * team score
   */
  score: {type: DataTypes.FLOAT},
  /**
   * team level calc from level config
   */
  level:{type: DataTypes.INTEGER},
  /**
   * team level title get from level config related
   */
  levelTitle: {type: DataTypes.STRING},
});

export default Team;
