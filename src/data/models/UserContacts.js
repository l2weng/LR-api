import { DataTypes } from 'sequelize'
import Model from '../sequelize'

const UserContacts = Model.define('UserContacts', {
  isOwner: {type: DataTypes.BOOLEAN, defaultValue: 0},
  companyId: {type:DataTypes.STRING, defaultValue: ''}
})

export default UserContacts
