import Sequelize from 'sequelize';

import * as dotenv from 'dotenv';

import pg from 'pg';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

if(process.env.NODE_ENV == "production"){
	pg.defaults.ssl = true;

	pg.connect(process.env.DATABASE_URL, (err, client)  => {
	  if (err) throw err;

	  console.log('Connected to postgres! Getting schemas...');

	  client
	    .query('SELECT table_schema,table_name FROM information_schema.tables;')
	    .on('row', (row) => {
	      console.log(JSON.stringify(row));
	    });
	});
}


export {sequelize};