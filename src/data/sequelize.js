import Sequelize from 'src/data/sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.database.WINDMYSQL.dbname,
  config.database.WINDMYSQL.username,
  config.database.WINDMYSQL.password,
  {
    host: config.database.WINDMYSQL.host,
    dialect: 'mysql',
    port: '3306',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
);

export default sequelize;
