import { Response, Request, NextFunction } from "express";
import { TokenService } from "../../core/services/TokenService/tokenService";
import { ErrorCode } from "../../core/errors/errorCodes";
import { InvalidTokenError, NoSecretKeyError, TokenExpiredError } from "../../core/errors/tokenErrors";

export class TokenController{
  constructor(readonly tokenService: TokenService) {}

  async checkAuth(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
      const authorizationHeader = req.headers['authorization'];
      
      //If no token -> locked
      if(!authorizationHeader) {
        res.status(423).json({
          error: {
            message: 'Missign auth token',
            code: ErrorCode.MISSING_TOKEN
          }
        });
        return;
      }

      const token = authorizationHeader.split(' ')[1];

      if(token === ''){
        res.status(423).json({
          error: {
            message: 'Missign auth token',
            code: ErrorCode.MISSING_TOKEN
          }
        });
        return;
      }

      const accessTokenBody = await this.tokenService.check(token);
      next();
    }catch(err){
      if(err instanceof NoSecretKeyError){
        res.status(500).json({
          error: {
            message: 'Missing secret key',
            code: ErrorCode.INTERNAL_SERVER_ERROR
          }
        });
        return;
      }

      if(err instanceof TokenExpiredError){
        res.status(401).json({
          error: {
            message: 'Token expired',
            code: ErrorCode.TOKEN_EXPIRED
          }
        });
        return;
      }

      if(err instanceof InvalidTokenError){
        res.status(400).json({
          error: {
            message: 'Token error',
            code: ErrorCode.INVALID_TOKEN
          }
        });
        return;
      }

      res.status(500).json({
        error: {
          message: 'Internal server error while parsing token',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }

  async login(req: Request, res: Response): Promise<void>{
    try{
      
    }catch(err){

    }
  }

  async logout(req: Request, res: Response): Promise<void>{
    try{

    }catch(err){

    }
  }

  async refresh(req: Request, res: Response): Promise<void>{
    try{

    }catch(err){

    }
  }

  async getAllTokens(req: Request, res: Response): Promise<void>{
    try{

    }catch(err){

    }
  }

  async closeToken(req: Request, res: Response): Promise<void>{
    try{

    }catch(err){

    }
  }

  async closeAllExceptCurrent(req: Request, res: Response): Promise<void>{
    try{

    }catch(err){

    }
  }
}