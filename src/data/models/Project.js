import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const Project = Model.define('Project', {
  projectId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: {type: DataTypes.STRING},
  desc: {type: DataTypes.STRING},
  deadline: {type: DataTypes.FLOAT},
  fileUuid: {type: DataTypes.STRING},
  /**
   * project file directory
   */
  projectFile: {type: DataTypes.STRING},
  /**
   * project type, 0: true or false question , 1: label, 2: review //todo extend much more type project
   */
  type: {type: DataTypes.INTEGER},
  /**
   * progress 进度最大值100
   */
  progress: {type: DataTypes.FLOAT},
  /**
   * 项目封面
   */
  cover: {type: DataTypes.STRING},
  /**
   * Item 总数
   */
  itemCount: {type: DataTypes.INTEGER},

  /**
   * 同步状态
   */
  syncStatus: {type: DataTypes.BOOLEAN, defaultValue: false},
  /**
   * 已同步项目封面
   */
  syncCover: {type: DataTypes.STRING},
  /**
   * 已同步项目文件
   */
  syncProjectFile: {type: DataTypes.STRING},
  /**
   * 已同步项目名
   */
  syncProjectFileName: {type: DataTypes.STRING},
  /**
   * 已同步项目大小
   */
  syncProjectSize: {type: DataTypes.INTEGER},
  /**
   * 本地项目id
   */
  localProjectId: {type: DataTypes.STRING},
  /**
   * 项目版本
   */
  syncVersion: {type: DataTypes.BIGINT, defaultValue: 0},

  creator: {type: DataTypes.STRING},

  creatorId: {type: DataTypes.STRING},

})

export default Project
