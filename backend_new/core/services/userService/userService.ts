import { UserFieldsConfig } from "../../../common/fieldsConfig";
import { checkPassword, hashPassword } from "../../../common/passwordHelpers";
import { NoSecretKeyError } from "../../errors/jwtErrors";
import { UserAlreadyExistsError, UserNotChangedError, UserNotFoundByEmailError, UserNotFoundError, UserWrongPasswordError } from "../../errors/userErrors";
import { UserRepository } from "../../repositories/UserRepository/userRepository";
import { CreateUserRepositoryDto, UpdateUserAvatarRepositoryDto, UpdateUserEmailRepositoryDto, UpdateUserFioRepositoryDto, UpdateUserPasswordRepositoryDto } from "../../repositories/UserRepository/userRepository.dto";
import { CreateUserServiceDto, LoginUserServiceDto, UpdateUserAvatarServiceDto, UpdateUserEmailServiceDto, UpdateUserFioServiceDto, UpdateUserPasswordServiceDto } from "./userService.dto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

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

  async login(dto: LoginUserServiceDto){
    try{
      //Ищем пользователя по почте
      const userWithEmail = await this.userRepository.getByEmail(dto.email);
      //Если не нашли -> ошибка
      if(userWithEmail === undefined) throw new UserNotFoundByEmailError(dto.email);
      //Проверяем пароли
      if(checkPassword(dto.password, userWithEmail.password_hash, userWithEmail.password_salt)) {
        //Получаем секретный ключ из переменных окружения
        const secretKey = process.env.JWT_SECRET;
        //Если ключа нет -> ошибка
        if(!secretKey) throw new NoSecretKeyError();

        //Иначе подписываем аксес токен
        const access_token = jwt.sign({ id: userWithEmail.id }, secretKey, {
          expiresIn: UserFieldsConfig.ACCESS_TOKEN_EXPIRE_TIME,
          algorithm: 'HS256',
        });
        //Подписываем рефреш токен
        const refresh_token = jwt.sign({ user_id: userWithEmail.id, token_id: uuidv4() }, secretKey, {
          expiresIn: UserFieldsConfig.REFRESH_TOKEN_EXPIRE_TIME,
          algorithm: 'HS256',
        })
        
        //
        //ЗАПИСАТЬ В REDIS REFRESH TOKEN UUID
        //

        //Возвращаем токены
        return { access_token, refresh_token };
      }
      //если пароли не равны -> ошибка
      throw new UserWrongPasswordError();
    }catch(err){
      throw err;
    }
  }

  async getAll(){
    try{
      const users = this.userRepository.getAll();
      return users;
    }catch(err){
      throw err;
    }
  }

  async getById(id: number){
    try{
      const user = await this.userRepository.getById(id);
      if(user === undefined) throw new UserNotFoundError(id);
      return user;
    }catch(err){
      throw err;
    }
  }

  async getByEmail(email: string){
    try{
      const user = await this.userRepository.getByEmail(email);
      if(user === undefined) throw new UserNotFoundByEmailError(email);
      return user;
    }catch(err){
      throw err;
    }
  }

  async getByGroupId(group_id: number){ // remove to groupService
    try{
      const users = await this.userRepository.getAllByGroupId(group_id);
      return users;
    }catch(err){
      throw err;
    }
  }

  async updatePassword(dto: UpdateUserPasswordServiceDto){
    try{
      //Get user by id
      const userById = await this.userRepository.getById(dto.id);
      //check user exists
      if(userById === undefined) throw new UserNotFoundError(dto.id);
      //check if password the same
      if(checkPassword(dto.password, userById.password_hash, userById.password_salt)) throw new UserNotChangedError(dto.id);
      //else create new hash and salt
      const { hash, salt } = hashPassword(dto.password);
      //create Dto
      const updateUserPasswordRepositoryDto: UpdateUserPasswordRepositoryDto = {
        id: dto.id,
        password_hash: hash,
        password_salt: salt,
      }
      //update password
      const updatedUser = await this.userRepository.updatePassword(updateUserPasswordRepositoryDto);
      return updatedUser;
    }catch(err){
      throw err;
    }
  }

  async updateEmail(dto: UpdateUserEmailServiceDto){
    try{
      //Get user by id
      const userById = await this.userRepository.getById(dto.id);
      //check user exists
      if(userById === undefined) throw new UserNotFoundError(dto.id);
      //check if email the same
      if(dto.email === userById.email) throw new UserNotChangedError(dto.id);
      //else create Dto
      const updateUserEmailRepositoryDto: UpdateUserEmailRepositoryDto = {
        id: dto.id,
        email: dto.email
      }
      //update email
      const updatedUser = await this.userRepository.updateEmail(updateUserEmailRepositoryDto);
      return updatedUser;
    }catch(err){
      throw err;
    }
  }

  async updateFio(dto: UpdateUserFioServiceDto){
    try{
      //Get user by id
      const userById = await this.userRepository.getById(dto.id);
      //check user exists
      if(userById === undefined) throw new UserNotFoundError(dto.id);
      //check if email the same
      if(dto.first_name === userById.first_name && dto.last_name === userById.last_name && dto.middle_name === userById.middle_name) throw new UserNotChangedError(dto.id);
      //else create Dto
      const updateUserFioRepositoryDto: UpdateUserFioRepositoryDto = {
        id: dto.id,
        first_name: dto.first_name,
        last_name: dto.last_name,
        middle_name: dto.middle_name,
      }
      //update email
      const updatedUser = await this.userRepository.updateFio(updateUserFioRepositoryDto);
      return updatedUser;
    }catch(err){
      throw err;
    }
  }

  async updateAvatar(dto: UpdateUserAvatarServiceDto){
    try{
      //Get user by id
      const userById = await this.userRepository.getById(dto.id);
      //check user exists
      if(userById === undefined) throw new UserNotFoundError(dto.id);
      //check if avatar the same
      if(dto.avatar_url === userById.avatar_url) throw new UserNotChangedError(dto.id);
      //else create Dto
      const updateUserAvatarRepositoryDto: UpdateUserAvatarRepositoryDto = {
        id: dto.id,
        avatar_url: dto.avatar_url
      }
      //update avatar
      const updatedUser = await this.userRepository.updateAvatar(updateUserAvatarRepositoryDto);
      return updatedUser;
    }catch(err){
      throw err;
    }
  }

  async delete(id: number){
    try{
      const deletedUser = await this.userRepository.delete(id);
      return deletedUser;
    }catch(err){
      throw err;
    }
  }
}