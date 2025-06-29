import { Request, Response } from 'express';
import { UserService } from "../../core/services/UserService/userService";
import { CreateUserServiceDto, UpdateUserAvatarServiceDto, UpdateUserEmailServiceDto, UpdateUserFioServiceDto, UpdateUserPasswordServiceDto } from "../../core/services/UserService/userService.dto";
import { UserAlreadyExistsError, UserNotChangedError, UserNotFoundByEmailError, UserNotFoundError } from '../../core/errors/userErrors';
import { ErrorCode } from '../../core/errors/errorCodes';
import { UserFieldsConfig } from '../../common/fieldsConfig';
import { PostgreSQLUniqueError } from '../../core/errors/dbErrors';
import { AuthRequest } from '../../common/interfaces';

export class UserController {
  constructor(readonly userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<void>{
    try{
      const { email, password, first_name, last_name, middle_name } = req.body as {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        middle_name?: string;
      };
      
      //Exists required fields
      if(!email || !password || !first_name || !last_name) {
        res.status(400).json({ 
          error: {
            message: 'Missing required fields', 
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      //Email validation
      if(email.length < UserFieldsConfig.EMAIL_MIN_LENGTH || email.length > UserFieldsConfig.EMAIL_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid email',
            code: ErrorCode.INVALID_EMAIL_FORMAT
          }
        });
        return;
      }

      //Password validation
      if(password.length < UserFieldsConfig.PASSWORD_MIN_LENGTH || password.length > UserFieldsConfig.PASSWORD_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid user password',
            code: ErrorCode.INVALID_USER_PASSWORD_FORMAT
          }
        });
        return;
      }

      //FirstName validation
      if(first_name.length < UserFieldsConfig.FIRST_NAME_MIN_LENGTH || first_name.length > UserFieldsConfig.FIRST_NAME_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid first name',
            code: ErrorCode.INVALID_FIRST_NAME_FORMAT
          }
        });
        return;
      }

      //LastName validation
      if(last_name.length < UserFieldsConfig.LAST_NAME_MIN_LENGTH || last_name.length > UserFieldsConfig.LAST_NAME_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid last name',
            code: ErrorCode.INVALID_LAST_NAME_FORMAT
          }
        });
        return;
      }

      //MiddleName validation
      if(middle_name !== undefined && (middle_name.length < UserFieldsConfig.MIDDLE_NAME_MIN_LENGTH || middle_name.length > UserFieldsConfig.MIDDLE_NAME_MAX_LENGTH)){
        res.status(422).json({
          error:{
            message: 'Invalid middle name',
            code: ErrorCode.INVALID_MIDDLE_NAME_FORMAT
          }
        });
        return;
      }
  
      const createUserServiceDto: CreateUserServiceDto = {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        middle_name: middle_name === undefined ? null : middle_name,
      }
  
      const user = await this.userService.create(createUserServiceDto);

      res.status(201).json({
        id: user.id
      });
    }catch(err){
      if(err instanceof UserAlreadyExistsError){
        res.status(409).json({
          error:{
            message: 'User already exists',
            code: ErrorCode.EMAIL_ALREADY_EXISTS
          }
        });
        return;
      }

      res.status(400).json({
        error: {
          message: 'Create user unexpected error',
          code: ErrorCode.UNEXPECTED_ERROR
        }
      });
    }
  }
  //Dev
  async getAllUsers(req: Request, res: Response): Promise<void>{
    try{
      const users = await this.userService.getAll();

      res.status(200).json(users);
    }catch(err){
      res.status(500).json({
        error:{
          message: "Internal server error",
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }

  async getAllUsersByGroupId(req: Request, res: Response): Promise<void>{ // remove to groupController
    try{
      const { group_id } = req.params as { group_id: string };

      if(!group_id){
        res.status(400).json({
          error: {
            message: 'Missing required fields', 
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      const number_group_id = parseInt(group_id);

      if(isNaN(number_group_id) || number_group_id < 0){
        res.status(400).json({
          error:{
            message: 'Invalid group id',
            code: ErrorCode.INVALID_INPUT
          }
        });
        return;
      }

      const users = await this.userService.getByGroupId(number_group_id);

      if(users.length === 0){
        res.status(404).json({
          error:{
            message: 'Group users list is empty',
            code: ErrorCode.UNEXPECTED_ERROR
          }
        });
        return;
      }

      res.status(200).json(users);
    }catch(err){
      res.status(500).json({
        error:{
          message: "Internal server error",
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }
  //Dev
  async getUserById(req: Request, res: Response): Promise<void>{
    try{
      const { id } = req.params as { id: string };

      if(!id){
        res.status(400).json({
          error: {
            message: 'Missing required fields', 
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      const numberID = parseInt(id);

      if(isNaN(numberID) || numberID < 0){
        res.status(400).json({
          error:{
            message: 'Invalid user id',
            code: ErrorCode.INVALID_INPUT
          }
        });
        return;
      }

      const user = await this.userService.getById(numberID);
      res.status(200).json(user);
    }catch(err){
      if(err instanceof UserNotFoundError){
        res.status(404).json({
          error: {
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }

      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
      return;
    }
  }

  async getUser(req: AuthRequest, res: Response): Promise<void>{
    try{
      const user = await this.userService.getById(req.user_id);
      res.status(200).json(user);
    }catch(err){
      if(err instanceof UserNotFoundError){
        res.status(404).json({
          error: {
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }

      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
      return;
    }
  }
  //Dev
  async getUserByEmail(req: Request, res: Response): Promise<void>{
    try{
      const { email } = req.body as { email: string };
  
      if(!email){
        res.status(400).json({
          error: {
            message: 'Missing required fields', 
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      const user = await this.userService.getByEmail(email);
      res.status(200).json(user);
    }catch(err){
      if(err instanceof UserNotFoundByEmailError){
        res.status(404).json({
          error: {
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }
      res.status(500).json({
        error:{
          message: "Internal server error",
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }

  async updateUserPassword(req: AuthRequest, res: Response): Promise<void>{
    try{
      const { password } = req.body as { password: string };

      //Exists required fields
      if(!password){
        res.status(400).json({
          error: {
            message: 'Missing required fields',
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      //Validate password
      if(password.length < UserFieldsConfig.PASSWORD_MIN_LENGTH || password.length > UserFieldsConfig.PASSWORD_MAX_LENGTH){
        res.status(422).json({
          error: {
            message: 'Invalid password',
            code: ErrorCode.INVALID_USER_PASSWORD_FORMAT
          }
        });
        return;
      }

      const updateUserPasswordServiceDto: UpdateUserPasswordServiceDto = {
        id: req.user_id,
        password: password
      }

      const newUser = await this.userService.updatePassword(updateUserPasswordServiceDto);
      res.status(200).json(newUser);
    }catch(err){
      if(err instanceof UserNotFoundError){
        res.status(404).json({
          error: {
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }
      if(err instanceof UserNotChangedError){
        res.status(304).json({
          error: {
            message: 'Nothing changed',
            code: ErrorCode.NOTHING_CHANGED
          }
        });
        return;
      }

      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  } 

  async updateUserEmail(req: AuthRequest, res: Response): Promise<void>{
    try{
      const { email } = req.body as { email: string };

      //Exists required fields
      if(!email){
        res.status(400).json({
          error: {
            message: 'Missing required fields',
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      //Email validation
      if(email.length < UserFieldsConfig.EMAIL_MIN_LENGTH || email.length > UserFieldsConfig.EMAIL_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid email',
            code: ErrorCode.INVALID_EMAIL_FORMAT
          }
        });
        return;
      }

      const updateUserEmailServiceDto: UpdateUserEmailServiceDto = {
        id: req.user_id,
        email: email
      }

      const newUser = await this.userService.updateEmail(updateUserEmailServiceDto);
      res.status(200).json(newUser);
    }catch(err){
      if(err instanceof UserNotFoundError){
        res.status(404).json({
          error: {
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }
      if(err instanceof UserNotChangedError){
        res.status(304).json({
          error: {
            message: 'Nothing changed',
            code: ErrorCode.NOTHING_CHANGED
          }
        });
        return;
      }
      if(err instanceof PostgreSQLUniqueError){
        res.status(406).json({
          error: {
            message: 'Email is already used',
            code: ErrorCode.EMAIL_ALREADY_EXISTS
          }
        });
        return;
      }

      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }

  async updateUserFio(req: AuthRequest, res: Response): Promise<void>{
    try{
      const { first_name, last_name, middle_name } = req.body as { first_name: string, last_name: string, middle_name?: string };

      //Exists required fields
      if(!first_name || !last_name){
        res.status(400).json({
          error: {
            message: 'Missing required fields',
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      //FirstName validation
      if(first_name.length < UserFieldsConfig.FIRST_NAME_MIN_LENGTH || first_name.length > UserFieldsConfig.FIRST_NAME_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid first name',
            code: ErrorCode.INVALID_FIRST_NAME_FORMAT
          }
        });
        return;
      }

      //LastName validation
      if(last_name.length < UserFieldsConfig.LAST_NAME_MIN_LENGTH || last_name.length > UserFieldsConfig.LAST_NAME_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid last name',
            code: ErrorCode.INVALID_LAST_NAME_FORMAT
          }
        });
        return;
      }

      //MiddleName validation
      if(middle_name !== undefined && (middle_name.length < UserFieldsConfig.MIDDLE_NAME_MIN_LENGTH || middle_name.length > UserFieldsConfig.MIDDLE_NAME_MAX_LENGTH)){
        res.status(422).json({
          error:{
            message: 'Invalid middle name',
            code: ErrorCode.INVALID_MIDDLE_NAME_FORMAT
          }
        });
        return;
      }

      const updateUserFioServiceDto: UpdateUserFioServiceDto = {
        id: req.user_id,
        first_name: first_name,
        last_name: last_name,
        middle_name: middle_name === undefined ? null : middle_name,
      }

      const newUser = await this.userService.updateFio(updateUserFioServiceDto);
      res.status(200).json(newUser);
    }catch(err){
      if(err instanceof UserNotFoundError){
        res.status(404).json({
          error: {
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }
      if(err instanceof UserNotChangedError){
        res.status(304).json({
          error: {
            message: 'Nothing changed',
            code: ErrorCode.NOTHING_CHANGED
          }
        });
        return;
      }

      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }

  async updateUserAvatar(req: AuthRequest, res: Response): Promise<void>{
    try{
      const { avatar_url } = req.body as { avatar_url: string | null };

      const newAvatarUrl = (!avatar_url || avatar_url.trim() === '') ? null : avatar_url.trim();

      const updateUserAvatarServiceDto: UpdateUserAvatarServiceDto = {
        id: req.user_id,
        avatar_url: newAvatarUrl,
      }

      const newUser = await this.userService.updateAvatar(updateUserAvatarServiceDto);
      res.status(200).json(newUser);
    }catch(err){
      if(err instanceof UserNotFoundError){
        res.status(404).json({
          error: {
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }
      if(err instanceof UserNotChangedError){
        res.status(304).json({
          error: {
            message: 'Nothing changed',
            code: ErrorCode.NOTHING_CHANGED
          }
        });
        return;
      }

      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }
}