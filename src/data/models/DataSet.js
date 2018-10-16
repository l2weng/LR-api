import {DataTypes} from 'sequelize';
import Model from '../sequelize';

const DataSet = Model.define('DataSet', {
  dataSetId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: {type: DataTypes.STRING},
  /**
   * 0: from disk, 1: url,  2: local url, 3: remote url, 4: local file system, 5: remote file system, 6:csv address
   */
  from: {type: DataTypes.INTEGER},

  /**
   * if 'from==0' disk photo folder
   */
  diskPhotoFolder: {type: DataTypes.STRING},

  /**
   * csv address
   */
  diskCsvAddress: {type: DataTypes.STRING},

  /**
   * 局域网文件服务
   */
  localUrl: {type: DataTypes.STRING},

  /**
   * 远程文件服务
   */
  remoteUrl: {type: DataTypes.STRING},

  /**
   * 本地共享文件夹
   */
  localFileSystem:{type: DataTypes.STRING},

  /**
   * 远程共享文件夹
   */
  remoteFileSystem:{type: DataTypes.STRING},

  /**
   * Use Cloud false: unused, true: used
   */
  useCloud: {type: DataTypes.BOOLEAN},

  /**
   * mapped false: 没有刷新映射到Photo表, true: 已经刷新映射Photo表
   */
  mapped: {type: DataTypes.BOOLEAN},
});

export default DataSet;
