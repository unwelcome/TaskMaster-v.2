const db = require('../database');

//GET

async function getAllUsers() {
  try{
    const result = await db.query('SELECT * FROM users;');
    return result.rows;
  }catch(e){
    throw e;
  }
}

async function getUserById(id) {
  try{
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }catch(e){
    throw e;
  }
}

async function getUserHashAndSalt(email) {
  try{
    const result = await db.query('SELECT id, password_hash, password_salt FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }catch(e){
    throw e;
  }
}

//CREATE

async function createUser(password_hash, password_salt, email, last_name, first_name, middle_name, avatar_url) {
  try{
    const result = await db.query(
      'INSERT INTO users (password_hash, password_salt, email, last_name, first_name, middle_name, avatar_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', 
      [password_hash, password_salt, email, last_name, first_name, middle_name, avatar_url]
    );
    return result.rows[0];
  }catch(e){
    throw e;
  }
}

//DELETE

async function deleteUser(id){
  try{
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return true;
  }catch(e){
    throw e;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserHashAndSalt,
  createUser,
  deleteUser,
}