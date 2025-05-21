const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST : 'localhost',
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

// Функция для выполнения SQL запросов
async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Error executing query', text, error);
    throw error;
  }
}
module.exports = {
  query,
};