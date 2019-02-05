import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const UserContacts = Model.define('UserContacts', {
  isOwner: {type: DataTypes.BOOLEAN, defaultValue: 0},
})

export default UserContacts
