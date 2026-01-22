const pool = require('./db.js');

async function addUserDB(username, mail, password, created_at) {
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');

    const sql = 'INSERT INTO users(username, mail, password, created_at) VALUES ($1,$2,$3,$4) RETURNING *';
    const result = await connection.query(sql, [username, mail, password, created_at]);

    await connection.query('COMMIT');

    return result.rows;
  } catch (error) {
    await connection.query('ROLLBACK');

    throw new Error(error.message);
  }
}

async function getByEmailDB(mail) {
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');

    const sql = 'SELECT * FROM users WHERE mail = $1';
    const result = await connection.query(sql, [mail]);

    await connection.query('COMMIT');

    return result.rows;
  } catch (error) {
    await connection.query('ROLLBACK');

    throw new Error(error.message);
  }
}

module.exports = { addUserDB, getByEmailDB };
