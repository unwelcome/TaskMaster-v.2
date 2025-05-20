const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST : 'localhost', //process.env.NODE_ENV === 'production' ? process.env.DB_HOST : 'localhost'
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Функция для выполнения SQL запросов
async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Error executing query', text, error);
    throw error; // Важно пробрасывать ошибку дальше
  }
}

// Пример функции для получения всех пользователей
async function getAllUsers() {
  console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}\n
    process.env.DB_HOST = ${process.env.DB_HOST}\n
    process.env.DB_PORT = ${process.env.DB_PORT}\n
    process.env.DB_NAME = ${process.env.DB_NAME}\n
    process.env.DB_USER = ${process.env.DB_USER}\n
    process.env.DB_PASSWORD = ${process.env.DB_PASSWORD}`);
  const result = await query('SELECT * FROM users;');
  return result.rows;
}

// Пример функции для получения пользователя по ID
async function getUserById(id) {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0]; // Возвращаем первый (и единственный) элемент массива или undefined
}

// Пример функции для создания пользователя
async function createUser(username, email) {
  const result = await query(
    'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
    [username, email]
  );
  return result.rows[0];
}

// Экспортируем функции для использования в других модулях
module.exports = {
  query, // Экспортируем базовую функцию query для гибкости
  getAllUsers,
  getUserById,
  createUser
};