import { hashPassword } from "../../../common/passwordHelpers";
import { GroupRepository } from "../../repositories/GroupRepository/groupRepository";
import { CreateGroupRepositoryDto } from "../../repositories/GroupRepository/groupRepository.dto";
import { CreateGroupServiceDto } from "./groupService.dto";

export class GroupService{
  constructor(readonly groupRepository: GroupRepository) {}

  async create(dto: CreateGroupServiceDto){
    try{
      //Хешируем пароль группы
      const { hash, salt } = hashPassword(dto.password);
      //Если установлена дата удаления группы -> преобразуем строку в оббъект даты
      let delete_at: Date | null = null;
      if(dto.delete_at !== null) delete_at = new Date(dto.delete_at); // "2023-10-27T10:00:00.000Z"
      //Создаем группу
      const createGroupRepositoryDto: CreateGroupRepositoryDto = {
        title: dto.title,
        password_hash: hash,
        password_salt: salt,
        created_by: dto.created_by,
        delete_at: delete_at,
      }
      const newGroup = await this.groupRepository.createGroup(createGroupRepositoryDto);
      return newGroup;
    }catch(err){
      throw err;
    }
  }

  async getAll(){
    try{
      const groupsList = await this.groupRepository.getAllGroups();
      return groupsList;
    }catch(err){
      throw err;
    }
  }
}