import { Request, Response } from 'express';
import { UserService } from "../../core/services/userService/userService";
import { CreateUserServiceDto } from "../../core/services/userService/userService.dto";
import { UserAlreadyExistsError } from '../../core/errors/userErrors';
import { ErrorCode } from '../../core/errors/errorCodes';
import { UserFieldsConfig } from '../../common/fieldsConfig';

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

  async getAllUsers(req: Request, res: Response): Promise<void>{
    try{
      const users = await this.userService.getAll();

      res.status(200).json(users);
    }catch(e){
      res.status(500).json({
        error:{
          message: "Internal server error",
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }
}