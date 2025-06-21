import { Group, GroupWithRole } from "../../../core/models/groupModel";
import { GroupRepository } from "../../../core/repositories/GroupRepository/groupRepository";
import { GetGroupWithRoleRepositoryDto, CreateGroupRepositoryDto, UpdateGroupPasswordRepositoryDto, UpdateGroupSettingsRepositoryDto } from "../../../core/repositories/GroupRepository/groupRepository.dto";
import * as db from "../postgresql";
import { PostgreSQLError } from "../../../core/errors/dbErrors";
import { GroupAlreadyExistsError, GroupNotFoundError } from "../../../core/errors/groupErrors";

export class GroupRepositoryImpl implements GroupRepository{
  async getGroupById(group_id: number): Promise<Group> {
    try{
      const result = await db.query('SELECT * FROM groups AS g WHERE g.id = $1', [group_id]);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Get group by id error');
    }
  }
  async getGroupWithRole(dto: GetGroupWithRoleRepositoryDto): Promise<GroupWithRole> {
    try{
      const result = await db.query('SELECT g.*, gm.role FROM groups AS g INNER JOIN group_members AS gm ON g.id = gm.group_id WHERE gm.user_id = $1 AND g.id = $2', [dto.user_id, dto.group_id]);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Get group with role by id error');
    }
  }
  async getAllGroups(): Promise<Group[]> {
    try{
      const result = await db.query('SELECT * FROM groups');
      return result.rows;
    }catch(err){
      throw new PostgreSQLError('Get all groups error');
    }
  }
  async getAllUserGroups(user_id: number): Promise<GroupWithRole[]> {
    try{
      const result = await db.query('SELECT g.*, gm.role FROM groups AS g INNER JOIN group_members AS gm ON g.id = gm.group_id WHERE gm.user_id = $1', [user_id]);
      return result.rows;
    }catch(err){
      throw new PostgreSQLError('Get all user groups error');
    }
  }

  async createGroup(dto: CreateGroupRepositoryDto): Promise<Group> {
    let client: db.PoolClient | null = null;
    try{
      //Получаем клиента
      client = await db.getClient();
      //НАчинаем транзакцию
      await client.query('BEGIN');

      const groupCreateResult = await db.query(`INSERT INTO groups (title, password_hash, password_salt, created_by, delete_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [ dto.title, dto.password_hash, dto.password_salt, dto.created_by, dto.delete_at === null ? null : dto.delete_at.toISOString() ]);

      //Проверяем что данные вставились в таблицу
      if(groupCreateResult.rowCount === 0) throw new PostgreSQLError('Insert into groups table error');
      
      const groupMembersResult = await db.query('INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3)', [groupCreateResult.rows[0].id, dto.created_by, 'teacher']);
      
      //Проверяем что данные вставились в таблицу
      if(groupMembersResult.rowCount === 0) throw new PostgreSQLError('Insert into group_members table error');

      //Завершаем транзакцию
      client.query('COMMIT');

      return groupCreateResult.rows[0];
    }catch(err: any){
      if(client){ //Откатываем транзакцию
        client.query('ROLLBACK');
      }
      if (err.code === '23505') {  // Ошибка нарушения уникальности группы
        throw new GroupAlreadyExistsError(dto.title, dto.password_hash);
      }
      throw new PostgreSQLError('Create group error');
    }finally{
      //Освобождаем клиента
      if(client) db.releaseClient(client);
    }
  }

  async updateGroupPassword(dto: UpdateGroupPasswordRepositoryDto): Promise<Group> {
    try{
      const result = await db.query('UPDATE groups SET password_hash = $2, password_salt = $3 WHERE id = $1 RETURNING *', [dto.id, dto.password_hash, dto.password_salt]);
      if(result.rowCount === 0) throw new GroupNotFoundError(dto.id);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Update group password error');
    }
  }
  async updateGroupSettings(dto: UpdateGroupSettingsRepositoryDto): Promise<Group> {
    try{
      const result = await db.query(`UPDATE groups SET 
        score_limit = $2, 
        topic_limit = $3,
        group_status = $4,
        enable_senior = $5,
        use_closed_chat = $6,
        create_seminars = $7,
        create_topics = $8,
        evaluate_topics = $9
        WHERE id = $1 RETURNING *`, 
        [dto.id, dto.score_limit, dto.topic_limit, dto.group_status, dto.enable_senior, dto.use_closed_chat, dto.create_seminars, dto.create_topics, dto.evaluate_topics]);
      
        if(result.rowCount === 0) throw new GroupNotFoundError(dto.id);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Update group settings error');
    }
  }

  async deleteGroupById(group_id: number): Promise<boolean> {
    try{
      const result = await db.query('DELETE FROM groups WHERE id = $1', [group_id]);
      if(result.rowCount === 0) throw new GroupNotFoundError(group_id);
      return result.rows[0];
    }catch(err){
      throw new PostgreSQLError('Delete group error');
    }
  }

}