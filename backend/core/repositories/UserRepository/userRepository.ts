import { User } from "../../models/userModel";
import { CreateUserRepositoryDto, UpdateUserPasswordRepositoryDto, UpdateUserEmailRepositoryDto, UpdateUserAvatarRepositoryDto, UpdateUserFioRepositoryDto} from "./userRepository.dto";

export interface UserRepository{
  checkUserExists(email: string): Promise<boolean>,

  create(dto: CreateUserRepositoryDto): Promise<User>,
  
  getAll(): Promise<User[]>,
  getAllByGroupId(group_id: number): Promise<User[]>, // remove to groupRepository
  getById(id: number): Promise<User | undefined>,
  getByEmail(email: string): Promise<User | undefined>,

  updatePassword(dto: UpdateUserPasswordRepositoryDto): Promise<User>,
  updateEmail(dto: UpdateUserEmailRepositoryDto): Promise<User>,
  updateFio(dto: UpdateUserFioRepositoryDto): Promise<User>,
  updateAvatar(dto: UpdateUserAvatarRepositoryDto): Promise<User>,

  delete(id: number): Promise<number>,
}