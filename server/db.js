import Sequelize from 'sequelize';

import pg from 'pg';

import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;

  pg.connect(process.env.DATABASE_URL, (err, client) => {
    if (err) throw err;

    client
      .query('SELECT table_schema,table_name FROM information_schema.tables;')
      .on('row', (row) => {
        JSON.stringify(row);
      });
  });
}


export default sequelize;
