import { Group, GroupWithRole } from "../../models/groupModel";
import { CreateGroupRepositoryDto, GetGroupWithRoleRepositoryDto, UpdateGroupPasswordRepositoryDto, UpdateGroupSettingsRepositoryDto } from "./groupRepository.dto";

export interface GroupRepository{
  getGroupById(group_id: number): Promise<Group>,
  getGroupWithRole(dto: GetGroupWithRoleRepositoryDto): Promise<GroupWithRole>,
  getAllGroups(): Promise<Group[]>,
  getAllUserGroups(user_id: number): Promise<GroupWithRole[]>,

  createGroup(dto: CreateGroupRepositoryDto): Promise<Group>,

  updateGroupPassword(dto: UpdateGroupPasswordRepositoryDto): Promise<Group>,
  updateGroupSettings(dto: UpdateGroupSettingsRepositoryDto): Promise<Group>,

  deleteGroupById(group_id: number): Promise<boolean>,
}