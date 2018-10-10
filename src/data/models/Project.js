import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Project = Model.define('Project', {
  projectId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  desc: { type: DataTypes.STRING(1000) },
  deadline: { type: DataTypes.FLOAT },
  /**
   * project type, 0: true or false question , 1: label, ...leave to extend
   */
  type: { type: DataTypes.INTEGER },
  /**
   * progress 进度最大值100
   */
  progress: { type: DataTypes.INTEGER },
});

export default Project;
