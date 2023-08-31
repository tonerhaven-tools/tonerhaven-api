const knex = require('knex');
let dotenv = require('dotenv').config()

const knexConfig = {
    development: {
        client: 'mysql',
        version: '8.1',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME,
            requestTimeout: 1000000,
            port: 3306,
        },
    },
};
const environment = process.env.NODE_ENV || 'development';
const Database = knex(knexConfig[environment]);

module.exports = Database;
