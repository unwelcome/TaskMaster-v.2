import { User } from "../../models/userModel";
import { CreateUserRepositoryDto, UpdateUserPasswordRepositoryDto, UpdateUserEmailRepositoryDto, UpdateUserAvatarRepositoryDto, UpdateUserFioRepositoryDto} from "./userRepository.dto";

export interface UserRepository{
  checkUserExists(email: string): Promise<boolean>,

  create(dto: CreateUserRepositoryDto): Promise<User>,
  
  getAll(): Promise<User[]>,
  getAllByGroupId(group_id: number): Promise<User[]>,
  getById(id: number): Promise<User | undefined>,
  getByEmail(email: string): Promise<User | undefined>,

  updatePassword(dto: UpdateUserPasswordRepositoryDto): Promise<User>,
  updateEmail(dto: UpdateUserEmailRepositoryDto): Promise<User>,
  updateFio(dto: UpdateUserAvatarRepositoryDto): Promise<User>,
  updateAvatar(dto: UpdateUserFioRepositoryDto): Promise<User>,

  delete(id: number): Promise<number>,
}