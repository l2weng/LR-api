import { DataTypes } from 'sequelize';
import Model from '../sequelize';
import md5 from 'blueimp-md5';

const User = Model.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is a required field',
      },
    },
  },

  email: {
    type: DataTypes.STRING,
  },

  status: { type: DataTypes.INTEGER },

  password_hash: DataTypes.STRING,

  phone: {
    allowNull: true,
    type: DataTypes.STRING,
    validate: {
      not: ['[a-z]', 'i'],
    },
  },

  userType: { type: DataTypes.INTEGER },

  password: {
    type: DataTypes.VIRTUAL,
    set(val) {
      // Remember to set the data value, otherwise it won't be validated
      this.setDataValue('password', val);
      this.setDataValue('password_hash', md5(val));
    },
    validate: {
      isLongEnough(val) {
        if (val.length < 7) {
          throw new Error('Please choose a longer password');
        }
      },
    },
  },
});

export default User;
