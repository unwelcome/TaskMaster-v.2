import { User } from "../../../core/models/userModel";
import { UserRepository } from "../../../core/repositories/UserRepository/userRepository";
import { CreateUserRepositoryDto, UpdateUserPasswordRepositoryDto, UpdateUserEmailRepositoryDto, UpdateUserAvatarRepositoryDto, UpdateUserFioRepositoryDto } from "../../../core/repositories/UserRepository/userRepository.dto";
import { PostgreSQLError, PostgreSQLUniqueError } from "../../../core/errors/dbErrors";
import * as db from "../postgresql";
import { UserNotFoundError } from "../../../core/errors/userErrors";

export class UserRepositoryImpl implements UserRepository{
  async checkUserExists(email: string): Promise<boolean> {
    try{
      const result = await db.query('SELECT 1 FROM users WHERE email = $1', [email]);
      return result.rowCount !== null && result.rowCount > 0;
    }catch(err){
      throw new PostgreSQLError('Check user exists error');
    }
  }

  async create(dto: CreateUserRepositoryDto): Promise<User> {
    try{
      const result = await db.query(
        'INSERT INTO users (password_hash, password_salt, email, last_name, first_name, middle_name, avatar_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
        [dto.password_hash, dto.password_salt, dto.email, dto.last_name, dto.first_name, dto.middle_name, dto.avatar_url]);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Create user error');
    }
  }

  async getAll(): Promise<User[]> {
    try{
      const result = await db.query('SELECT * FROM users');
      return result.rows;
    }catch(err){
      throw new PostgreSQLError('Get all users error');
    }
  }
  async getAllByGroupId(group_id: number): Promise<User[]> {
    try{
      const result = await db.query('SELECT u.* FROM group_members AS gm JOIN users AS u ON gm.user_id = u.id WHERE group_id = $1', [group_id]);
      return result.rows;
    }catch(err){
      throw new PostgreSQLError('Get all users error');
    }
  }
  async getById(id: number): Promise<User | undefined> {
    try{
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Get user by id error');
    }
  }
  async getByEmail(email: string): Promise<User | undefined> {
    try{
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Get user by email error');
    }
  }

  async updatePassword(dto: UpdateUserPasswordRepositoryDto): Promise<User> {
    try{
      const result = await db.query('UPDATE users SET password_hash = $2, password_salt = $3 WHERE id = $1 RETURNING *', [dto.id, dto.password_hash, dto.password_salt]);
      if(result.rowCount === 0) throw new UserNotFoundError(dto.id);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Update user password error');
    }
  }
  async updateEmail(dto: UpdateUserEmailRepositoryDto): Promise<User> {
    try{
      const result = await db.query('UPDATE users SET email = $2 WHERE id = $1 RETURNING *', [dto.id, dto.email]);
      if(result.rowCount === 0) throw new UserNotFoundError(dto.id);
      return result.rows[0];
    }catch(err: any){
      if (err.code === '23505') {  // Ошибка нарушения уникальности email
        throw new PostgreSQLUniqueError(`email: ${dto.email} already exists`);
      }
      else throw new PostgreSQLError('Update user email error');
    }
  }
  async updateFio(dto: UpdateUserFioRepositoryDto): Promise<User> {
    try{
      const result = await db.query('UPDATE users SET first_name = $2, last_name = $3, middle_name = $4 WHERE id = $1 RETURNING *', [dto.id, dto.first_name, dto.last_name, dto.middle_name]);
      if(result.rowCount === 0) throw new UserNotFoundError(dto.id);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Update user avatar_url error');
    }
  }
  async updateAvatar(dto: UpdateUserAvatarRepositoryDto): Promise<User> {
    try{
      const result = await db.query('UPDATE users SET avatar_url = $2 WHERE id = $1 RETURNING *', [dto.id, dto.avatar_url]);
      if(result.rowCount === 0) throw new UserNotFoundError(dto.id);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Update user fio error');
    }
  }

  async delete(id: number): Promise<number> {
    try{
      const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
      if(result.rowCount === 0) throw new UserNotFoundError(id);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Delete user error');
    }
  }
  
}