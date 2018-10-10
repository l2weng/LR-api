import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Team = Model.define('Team', {
  teamId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default Team;
