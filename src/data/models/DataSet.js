import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const DataSet = Model.define('DataSet', {
  dataSetId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  /**
   * 0: from disk, 1: local url, 2: remote url, 3: local file system, 4: remote file system, 5:csv address
   * supports multiple e.g. 0,1,3,4,6
   */
  from: { type: DataTypes.INTEGER },

  /**
   * if 'from==0' disk photo folder
   */
  diskPhotoFolder: { type: DataTypes.STRING },

  /**
   * csv address
   */
  diskCsvAddress: { type: DataTypes.STRING },

  /**
   * 局域网文件服务
   */
  localUrl: { type: DataTypes.STRING },

  /**
   * 远程文件服务
   */
  remoteUrl: { type: DataTypes.STRING },

  /**
   * 本地共享文件夹
   */
  localFileSystem: { type: DataTypes.STRING },

  /**
   * 远程共享文件夹
   */
  remoteFileSystem: { type: DataTypes.STRING },

  /**
   * Use Cloud false: unused, true: used
   */
  useCloud: { type: DataTypes.BOOLEAN, defaultValue: false },

  /**
   * 0: 未同步上云, 1: 已经同步成功, 2: 部分成功, 3: 同步中
   */
  syncStatus: { type: DataTypes.INTEGER },
});

export default DataSet;
