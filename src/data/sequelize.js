import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.database.MYSQL.dbname,
  config.database.MYSQL.username,
  config.database.MYSQL.password,
  {
    host: config.database.MYSQL.host,
    dialect: 'mysql',
    port: '3306',
    pool: {
      max: 100,
      min: 0,
      idle: 10000,
    },
  },
);

export default sequelize;
