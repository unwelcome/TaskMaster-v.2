import { Response, Request, NextFunction } from "express";
import { TokenService } from "../../core/services/TokenService/tokenService";
import { ErrorCode } from "../../core/errors/errorCodes";
import { InvalidTokenError, NoSecretKeyError, TokenExpiredError } from "../../core/errors/tokenErrors";
import { UserFieldsConfig } from "../../common/fieldsConfig";
import { LoginTokenServiceDto, RefreshTokenServiceDto } from "../../core/services/TokenService/tokenService.dto";
import { UserNotFoundByEmailError, UserWrongPasswordError } from "../../core/errors/userErrors";

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
      const { email, password } = req.body as { email: string, password: string };

      //Exists required fields
      if(!email || !password){
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

      
      //Make Dto
      const userIp = this.getClientIp(req);
      const loginTokenServiceDto: LoginTokenServiceDto = {
        ip: userIp ? userIp : '',
        email: email,
        password: password,
        user_agent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
      }

      //Check password correct and create tokens
      const { access_token, refreshTokenId } = await this.tokenService.login(loginTokenServiceDto);

      res.cookie('refresh_token_id', refreshTokenId, {
        httpOnly: UserFieldsConfig.REFRESH_HTTP_ONLY,
        secure: UserFieldsConfig.REFRESH_SECURE,
        sameSite: UserFieldsConfig.REFRESH_SAMESITE,
        path: UserFieldsConfig.REFRESH_PATH,
        maxAge: UserFieldsConfig.REFRESH_TOKEN_EXPIRE_TIME
      });

      res.status(200).json({
        access_token: access_token
      });
      
    }catch(err){
      if(err instanceof UserNotFoundByEmailError){
        res.status(404).json({
          error:{
            message: 'User not found',
            code: ErrorCode.USER_NOT_FOUND
          }
        });
        return;
      }

      if(err instanceof NoSecretKeyError){
        res.status(500).json({
          error:{
            message: 'Internal server error, no secret key',
            code: ErrorCode.INTERNAL_SERVER_ERROR
          }
        });
        return;
      }

      if(err instanceof UserWrongPasswordError){
        res.status(403).json({
          error: {
            message: 'Wrong password',
            code: ErrorCode.WRONG_PASSWORD
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

  async logout(req: Request, res: Response): Promise<void>{
    try{
      const refreshTokenId = req.cookies.refresh_token_id;

      if(!refreshTokenId){
        res.status(404).json({
          error: {
            message: 'Refresh token id not found',
            code: ErrorCode.MISSING_TOKEN
          }
        });
        return;
      }

      await this.tokenService.logout(refreshTokenId);

      res.status(200).json({
        message: 'Logout successfully'  
      });
    }catch(err){
      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
    }
  }

  async refresh(req: Request, res: Response): Promise<void>{
    try{
      const oldRefreshTokenId = req.cookies.refresh_token_id;

      if(!oldRefreshTokenId){
        res.status(404).json({
          error: {
            message: 'Refresh token id not found',
            code: ErrorCode.MISSING_TOKEN
          }
        });
        return;
      }

      const userIp = this.getClientIp(req);
      const refreshTokenServiceDto: RefreshTokenServiceDto = {
        ip: userIp ? userIp : '',
        token_id: oldRefreshTokenId,
        user_agent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
      }

      const { access_token, refreshTokenId } = await this.tokenService.refresh(refreshTokenServiceDto);

      res.cookie('refresh_token_id', refreshTokenId, {
        httpOnly: UserFieldsConfig.REFRESH_HTTP_ONLY,
        secure: UserFieldsConfig.REFRESH_SECURE,
        sameSite: UserFieldsConfig.REFRESH_SAMESITE,
        path: UserFieldsConfig.REFRESH_PATH,
        maxAge: UserFieldsConfig.REFRESH_TOKEN_EXPIRE_TIME
      });

      res.status(200).json({
        access_token: access_token
      });
    }catch(err){
      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
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

  private getClientIp(req: Request): string | null {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      return (forwarded as string).split(',')[0].trim();
    }
    return req.socket.remoteAddress || null;
  }
}