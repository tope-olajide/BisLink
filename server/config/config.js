require('dotenv').config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: process.env.dialect
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
