require("dotenv").config();

module.exports = {
  development: {
      username: 'u123456789_admin',
    password: 'TuContraseñaSegura',
    database: 'u123456789_stratrooms',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_DATABASE}_test`,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
