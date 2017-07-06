'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();

var sequelize = new _sequelize2.default(process.env.DATABASE_URL);

if (process.env.NODE_ENV === 'production') {
  _pg2.default.defaults.ssl = true;

  _pg2.default.connect(process.env.DATABASE_URL, function (err, client) {
    if (err) throw err;

    console.log('Connected to postgres! Getting schemas...');

    client.query('SELECT table_schema,table_name FROM information_schema.tables;').on('row', function (row) {
      console.log(JSON.stringify(row));
    });
  });
}

exports.sequelize = sequelize;