import { Response, Request } from "express";
import { AccountService } from "../../core/services/AccountService/accountService";
import { AuthRequest } from "../../common/interfaces";
import { UserNotFoundError } from "../../core/errors/userErrors";
import { ErrorCode } from "../../core/errors/errorCodes";

export class AccountController{
  constructor(readonly accountService: AccountService) {}

  async deleteAccount(req: AuthRequest, res: Response): Promise<void>{
    try{
      const isAccountDeleted = await this.accountService.deleteAccount(req.user_id);

      if(isAccountDeleted) res.status(204).json(`Account with id:${req.user_id} deleted successfully`);
      else res.status(500).json({
        error: {
          message: 'Unexpected error while deleting account',
          code: ErrorCode.UNEXPECTED_ERROR
        }
      });

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
    }
  }

  //Dev
  async deleteAccountById(req: Request, res: Response): Promise<void>{
    try{
      const { id } = req.params as { id: string };

      //Exists required fields
      if(!id){
        res.status(400).json({
          error: {
            message: 'Missing required fields',
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      const number_id = parseInt(id);

      //Validate id as number
      if(isNaN(number_id) || number_id < 0){
        res.status(422).json({
          error: {
            message: 'Invalid user id',
            code: ErrorCode.INVALID_INPUT
          }
        });
        return;
      }

      const isAccountDeleted = await this.accountService.deleteAccount(number_id);

      if(isAccountDeleted) res.status(204).json(`Account with id:${number_id} deleted successfully`);
      else res.status(500).json({
        error: {
          message: 'Unexpected error while deleting account',
          code: ErrorCode.UNEXPECTED_ERROR
        }
      });
      
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
    }
  }
}