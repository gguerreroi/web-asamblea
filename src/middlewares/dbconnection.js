import config from '../config/config'
import Sequelize from "sequelize";


export const dbConnection = new Sequelize({
    dialect: 'mssql',
    host: `${config.DB.HOST}`,
    username: `${config.DB.USER}`,
    password: `${config.DB.PASSWORD}`,
    database: `${config.DB.DATABASE}`,
});
