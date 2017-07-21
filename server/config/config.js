// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.DATABASE_URL);

module.exports = {
  development: {
    dialect: 'postgres',
    use_env_variable: process.env.DATABASE_URL
  },
  test: {
    dialect: 'postgres',
    use_env_variable: process.env.DATABASE_TEST_URL
  },
  production: {
    dialect: 'postgres',
    use_env_variable: process.env.PROD_DATABASE_URL
  }
};
