const knex = require('knex');
const Config   = require('../configs/application');


const knexConfig = {
    development: {
        client: 'mysql',
        version: '8.1',
        connection: {
            host: Config.DB_HOST,
            user: Config.DB_USER,
            password: Config.DB_PW,
            database: Config.DB_NAME,
            requestTimeout: 1000000,
            port: 3306,
        },
    },
};
const environment = process.env.NODE_ENV || 'development';
const Database = knex(knexConfig[environment]);

module.exports = Database;
