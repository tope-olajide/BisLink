require('dotenv').config();
/* {
  "development": {
      "username": "Temitope",
      "password": "liverp00l",
      "database": "Bislink",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
} */
module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: process.env.dialect
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
