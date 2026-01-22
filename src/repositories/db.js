const { Pool } = require('pg');

const pool = new Pool({
  password: '12345678',
  database: 'auth_db',
  port: 5432,
  host: 'localhost',
  user: 'postgres',
});

module.exports = pool;
