import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const DataSet = Model.define('DataSet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  // 0: photo folder, 1: photos , 2: csv address
  /**
   * 0: from disk, 1: url, 2: from disk and url, 3: csv address
   */
  from: { type: DataTypes.INTEGER },

  /**
   * if 'from==1' disk photo folder
   */
  diskPhotoFolder: { type: DataTypes.STRING },

  diskCsvAddress: { type: DataTypes.STRING },

  /**
   * Use Cloud false: unused Cloud, true: used Cloud
   */
  useCloud: { type: DataTypes.BOOLEAN },

  /**
   * mapped false: 没有刷新映射到Photo表, true: 已经刷新映射Photo表
   */
  mapped: { type: DataTypes.BOOLEAN },
});

export default Project;
