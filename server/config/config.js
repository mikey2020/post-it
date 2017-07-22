require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: process.env.DATABASE_TEST_URL,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: process.env.PROD_DATABASE_URL,
    dialect: 'postgres'
  },
};
