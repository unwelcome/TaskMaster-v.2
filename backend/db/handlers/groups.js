const db = require('../database');

async function getAllGroups() {
  try{
    const result = await db.query(`SELECT * FROM groups;`);
    return result.rows;
  }catch(e){
    throw e;
  }
}

async function getUserGroupsById(id) {
  try{
    const result = await db.query(`
      SELECT 
        gm.group_id,
        gm.role,
        g.title
      FROM 
        group_members AS gm
      JOIN
        groups AS g ON gm.group_id = g.id
      WHERE 
        user_id = $1`,
      [id]);
    return result.rows;
  }catch(e){
    throw e;
  }
}

async function createGroup(title, password_hash, password_salt, creator_id){
  try{
    const result = await db.query(`
      WITH created_group AS (
        INSERT INTO groups (title, password_hash, password_salt, created_by) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id
      )
      INSERT INTO group_members (group_id, user_id, role) 
      SELECT id , $4, 'teacher' 
      FROM created_group
      RETURNING group_id;
      `, [title, password_hash, password_salt, creator_id]);
    return result.rows[0];
  }catch(e){
    throw e;
  }
}

module.exports = {
  getAllGroups,
  getUserGroupsById,
  createGroup,
}