require("dotenv").config();
const pg = require("pg");

const config = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: pg,
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_TEST, // DATABASE BARU KHUSUS TESTING
    host: "localhost",
    dialect: "postgres",
    dialectModule: pg,
  },
  docker: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    ports: 5439,
  },
};

// console.log(config);

module.exports = config;
