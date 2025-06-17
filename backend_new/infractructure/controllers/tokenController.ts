import { Response, Request, NextFunction } from "express";
import { TokenService } from "../../core/services/TokenService/tokenService";
import { ErrorCode } from "../../core/errors/errorCodes";
import { AnotherUserTokenError, InvalidTokenError, NoSecretKeyError, TokenExpiredError, TokenNotFoundError } from "../../core/errors/tokenErrors";
import { UserFieldsConfig } from "../../common/fieldsConfig";
import { DeleteAllRefreshTokenServiceDto, DeleteRefreshTokenServiceDto, LoginTokenServiceDto, RefreshTokenServiceDto } from "../../core/services/TokenService/tokenService.dto";
import { UserNotFoundByEmailError, UserWrongPasswordError } from "../../core/errors/userErrors";
import { AuthRequest } from "../../common/interfaces";

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
      (req as AuthRequest).user_id = accessTokenBody.user_id;
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

      this.saveTokens(res, access_token, refreshTokenId);
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
      if(err instanceof TokenNotFoundError){
        res.status(400).json({
          error: {
            message: 'Invalid token',
            code: ErrorCode.INVALID_TOKEN
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

      this.saveTokens(res, access_token, refreshTokenId);
    }catch(err){
      if(err instanceof TokenNotFoundError){
        res.status(400).json({
          error: {
            message: 'Previous token not found',
            code: ErrorCode.INVALID_TOKEN
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

  async getAllTokens(req: AuthRequest, res: Response): Promise<void>{
    try{
      const userTokens = await this.tokenService.getUserTokens(req.user_id);
      res.status(200).json(userTokens);
    }catch(err){
      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
      return;
    }
  }

  async closeToken(req: AuthRequest, res: Response): Promise<void>{
    try{
      const { refresh_token_id } = req.body as { refresh_token_id: string };

      if(!refresh_token_id){
        res.status(400).json({
          error: {
            message: 'Missing refresh token id',
            code: ErrorCode.MISSING_REQUIRED_FIELD
          }
        });
        return;
      }

      const deleteRefreshTokenServiceDto: DeleteRefreshTokenServiceDto = {
        user_id: req.user_id,
        token_id: refresh_token_id,
      }

      await this.tokenService.deleteTokenById(deleteRefreshTokenServiceDto);
      res.status(200).json({message: 'Token deleted successfully'});
    }catch(err){
      if(err instanceof TokenNotFoundError){
        res.status(404).json({
          error: {
            message: 'Refresh token not found',
            code: ErrorCode.TOKEN_NOT_FOUND
          }
        });
        return;
      }
      if(err instanceof AnotherUserTokenError){
        res.status(403).json({
          error: {
            message: 'Refresh token belongs to another user',
            code: ErrorCode.NOT_ENOUGH_RIGHTS
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

  async closeAllExceptCurrent(req: AuthRequest, res: Response): Promise<void>{
    try{
      const userIp = this.getClientIp(req);

      const deleteAllRefreshTokenServiceDto: DeleteAllRefreshTokenServiceDto = {
        ip: userIp ? userIp : '',
        user_id: req.user_id,
        user_agent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
      }

      const { access_token, refreshTokenId } = await this.tokenService.deleteAllTokens(deleteAllRefreshTokenServiceDto);

      this.saveTokens(res, access_token, refreshTokenId);
    }catch(err){
      res.status(500).json({
        error: {
          message: 'Internal server error',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
      return;
    }
  }

  private getClientIp(req: Request): string | null {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      return (forwarded as string).split(',')[0].trim();
    }
    return req.socket.remoteAddress || null;
  }

  private saveTokens(res: Response, access_token: string, refreshTokenId: string){
    res.cookie('refresh_token_id', refreshTokenId, {
      httpOnly: UserFieldsConfig.REFRESH_HTTP_ONLY,
      secure: UserFieldsConfig.REFRESH_SECURE,
      sameSite: UserFieldsConfig.REFRESH_SAMESITE,
      path: UserFieldsConfig.REFRESH_PATH,
      maxAge: UserFieldsConfig.REFRESH_TOKEN_EXPIRE_TIME * 1000,
    });

    res.cookie('access_token', access_token, {
      httpOnly: UserFieldsConfig.ACCESS_HTTP_ONLY,
      secure: UserFieldsConfig.ACCESS_SECURE,
      sameSite: UserFieldsConfig.ACCESS_SAMESITE,
      path: UserFieldsConfig.ACCESS_PATH,
      maxAge: UserFieldsConfig.ACCESS_TOKEN_EXPIRE_TIME * 1000,
    });

    res.status(200).json({
      access_token: access_token
    });
  }
}