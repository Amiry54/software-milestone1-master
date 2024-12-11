require('dotenv').config();
const knex = require('knex');

const config = {
  client: 'pg',
  connection: {
    host: 'localhost',      
    port: 5432,
    user: 'postgres',
    password: '123',
    database: 'postgres'   
  }
};

const db = knex(config);

module.exports = db;
