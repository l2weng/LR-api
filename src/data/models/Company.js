import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Company = Model.define('Company', {
  companyId: {
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

  emailDomain: {
    type: DataTypes.STRING,
  },

  status: { type: DataTypes.INTEGER },

});

export default Company;
