const globalConstants = require('../../const/globalConstants')

module.exports = {
  "development": {
    "username": globalConstants.DB_USERNAME,
    "password": globalConstants.DB_PASSWORD,
    "database": globalConstants.DB_NAME,
    "host": 'localhost',
    "dialect": 'mysql',
  },

  "test": {
    "username": 'root',
    "password": 'root',
    "database": 'estomato-test',
    "host": 'localhost',
    "dialect": 'mysql',
  },

  "production": {
    "username": 'root',
    "password": 'root',
    "database": 'estomato-prod',
    "host": 'localhost',
    "dialect": 'mysql',
  }
}