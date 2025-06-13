import { Pool } from "pg";

const host = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST : 'localhost'
const port = process.env.POSTGRES_PORT === undefined ? 5432 : parseInt(process.env.POSTGRES_PORT);
const database = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

const pool = new Pool({
  host: host,
  port: port,
  database: database,
  user: user,
  password: password
});

// Функция для выполнения SQL запросов
export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error: any) {
    if(error.code !== '23505') console.error('PostgreSQL Error: executing query', text, error); // 23505 - ошибка уникальности (можно и не выводить)
    throw error;
  }
}