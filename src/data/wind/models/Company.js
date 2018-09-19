import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const Company = Model.define('WindCompany', {
  companyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is a required field',
      },
    },
  },
  type: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
});

export default Company;
