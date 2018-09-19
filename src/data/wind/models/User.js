import { DataTypes } from 'sequelize';
import Model from '../sequelize';
import md5 from 'blueimp-md5';

const User = Model.define('WindUser', {
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

  displayName: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  type: {
    type: DataTypes.INTEGER,
  },

  typeDes: { type: DataTypes.STRING },

  active: { type: DataTypes.INTEGER },

  password_hash: DataTypes.STRING,

  phone:{
    allowNull: true,
    type: DataTypes.STRING,
    validate: {
      not: ['[a-z]', 'i']
    }
  },

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
