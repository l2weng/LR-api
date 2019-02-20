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
   * project file directory
   */
  fileDirectory: {type: DataTypes.STRING},
  /**
   * project type, 0: true or false question , 1: label, 2: review //todo extend much more type project
   */
  type: { type: DataTypes.INTEGER },
  /**
   * progress 进度最大值100
   */
  progress: { type: DataTypes.INTEGER },
  /**
   * 项目封面
   */
  cover: {type:DataTypes.STRING},
  /**
   * 远程项目封面
   */
  remoteCover: {type:DataTypes.STRING}
});

export default Project;
