/* https://www.youtube.com/watch?v=wfrn21E2NaU */

require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './configs/database/migrations'
    },
    seeds: {
      directory: './configs/database/seeders'
    }
  }
};
