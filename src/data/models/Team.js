import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const Team = Model.define('Team', {
  teamId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: {type: DataTypes.STRING},
  /**
   * 0: Public, 1: Private
   */
  type: {type: DataTypes.INTEGER, defaultValue: 0},
  icon: {type: DataTypes.STRING},
  /**
   * team score
   */
  score: {type: DataTypes.FLOAT, defaultValue: 0},
  /**
   * team level calc from level config
   */
  level: {type: DataTypes.INTEGER},
  /**
   * team level title get from level config related
   */
  levelTitle: {type: DataTypes.STRING},
  /**
   * team size
   */
  teamSize: {type: DataTypes.INTEGER, defaultValue: 0},
  desc: {type: DataTypes.STRING(500)},
  avatarColor: {type: DataTypes.STRING(10)},
})

export default Team
