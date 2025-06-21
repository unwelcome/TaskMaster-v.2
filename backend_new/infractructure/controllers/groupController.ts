import { GroupFieldsConfig } from "../../common/fieldsConfig";
import { ErrorCode } from "../../core/errors/errorCodes";
import { GroupService } from "../../core/services/GroupService/groupService";
import { Request, Response } from "express";
import { CreateGroupServiceDto } from "../../core/services/GroupService/groupService.dto";
import { AuthRequest } from "../../common/interfaces";
import { GroupAlreadyExistsError } from "../../core/errors/groupErrors";

export class GroupController{
  constructor(readonly groupService: GroupService) {}

  async createGroup(req: AuthRequest, res: Response): Promise<void>{
    try{
      const { title, password, delete_at } = req.body as {
        title: string,
        password: string,
        delete_at?: string,
      };

            
      //Exists required fields
      if(!title || !password) {
        res.status(400).json({ 
          error: {
            message: 'Missing required fields', 
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      //Email validation
      if(title.length < GroupFieldsConfig.TITLE_MIN_LENGTH || title.length > GroupFieldsConfig.TITLE_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid title',
            code: ErrorCode.INVALID_GROUP_TITLE_FORMAT
          }
        });
        return;
      }

      //Password validation
      if(password.length < GroupFieldsConfig.PASSWORD_MIN_LENGTH || password.length > GroupFieldsConfig.PASSWORD_MAX_LENGTH){
        res.status(422).json({
          error:{
            message: 'Invalid group password',
            code: ErrorCode.INVALID_GROUP_PASSWORD_FORMAT
          }
        });
        return;
      }

      const createGroupServiceDto: CreateGroupServiceDto = {
        title: title,
        password: password,
        created_by: req.user_id,
        delete_at: delete_at ? delete_at : null,
      }
  
      const group = await this.groupService.create(createGroupServiceDto);

      res.status(201).json({
        id: group.id
      });
    }catch(err){
      if(err instanceof GroupAlreadyExistsError){
        res.status(409).json({
          error:{
            message: 'Group already exists',
            code: ErrorCode.GROUP_ALREADY_EXISTS
          }
        });
        return;
      }

      res.status(400).json({
        error: {
          message: 'Create group unexpected error',
          code: ErrorCode.UNEXPECTED_ERROR
        }
      });
    }
  }

  //Dev
  async getAllGroups(req: Request, res: Response): Promise<void>{
    try{
      const groupsList = await this.groupService.getAll();
      res.status(200).json(groupsList);
    }catch(err){
      res.status(400).json({
        error: {
          message: 'Get all groups unexpected error',
          code: ErrorCode.UNEXPECTED_ERROR
        }
      });
    }
  }
}