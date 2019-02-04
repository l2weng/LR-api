import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const UserContacts = Model.define('UserContacts', {
  isOwner: { type: DataTypes.BOOLEAN },
});

export default UserContacts;
