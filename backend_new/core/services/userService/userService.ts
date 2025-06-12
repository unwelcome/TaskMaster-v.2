import { hashPassword } from "../../../common/passwordHelpers";
import { UserAlreadyExistsError } from "../../errors/userErrors";
import { UserRepository } from "../../repositories/UserRepository/userRepository";
import { CreateUserRepositoryDto } from "../../repositories/UserRepository/userRepository.dto";
import { CreateUserServiceDto } from "./userService.dto";

export class UserService{
  constructor(readonly userRepository: UserRepository) {}

  async create(dto: CreateUserServiceDto){
    const {hash, salt} = hashPassword(dto.password);

    const createUserDto: CreateUserRepositoryDto = {
      password_hash: hash,
      password_salt: salt,
      email: dto.email,
      first_name: dto.first_name,
      last_name: dto.last_name,
      middle_name: dto.middle_name,
      avatar_url: null,
    }

    if(await this.userRepository.checkUserExists(dto.email)){
      throw new UserAlreadyExistsError(dto.email);
    }

    return this.userRepository.create(createUserDto);
  }

  async getAll(){
    return this.userRepository.getAll();
  }
}