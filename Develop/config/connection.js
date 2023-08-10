
const { Sequelize } = require('sequelize');


require('dotenv').config();


const DB_NAME = process.env.DB_NAME || 'titan_db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || 'localhost'; 

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: host,
  dialect: 'mysql',  
  logging: false,      
});

module.exports = sequelize;


/*
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
*/
