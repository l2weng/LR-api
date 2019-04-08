import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const SlothFridge = Model.define('SlothFridge', {
  slothFridgeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  fridgeId: {type: DataTypes.INTEGER},
  openCount: {type: DataTypes.INTEGER},
  type: {type: DataTypes.INTEGER},

})

export default SlothFridge
