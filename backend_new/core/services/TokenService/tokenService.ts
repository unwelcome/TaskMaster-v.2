import { UserFieldsConfig } from "../../../common/fieldsConfig";
import { checkPassword } from "../../../common/passwordHelpers";
import { InvalidTokenError, NoSecretKeyError, TokenExpiredError } from "../../errors/tokenErrors";
import { UserNotFoundByEmailError, UserWrongPasswordError } from "../../errors/userErrors";
import { AccessTokenBody, RefreshTokenBody } from "../../models/tokenModel";
import { TokenRepository } from "../../repositories/TokenRepository/tokenRepository";
import { UserRepository } from "../../repositories/UserRepository/userRepository";
import { CreateTokenServiceDto, LoginTokenServiceDto, RefreshTokenServiceDto } from "./tokenService.dto";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { UAParser } from 'ua-parser-js';
import { AddRefreshTokenRepositoryDto, DeleteRefreshTokenRepositoryDto } from "../../repositories/TokenRepository/tokenRepository.dto";

export class TokenService{
  constructor(readonly tokenRepository: TokenRepository, readonly userRepository: UserRepository) {}

  async login(dto: LoginTokenServiceDto){
    try{
      //Ищем пользователя по почте
      const userWithEmail = await this.userRepository.getByEmail(dto.email);
      //Если не нашли -> ошибка
      if(userWithEmail === undefined) throw new UserNotFoundByEmailError(dto.email);
      //Проверяем пароли, не равны -> ошибка
      if(!checkPassword(dto.password, userWithEmail.password_hash, userWithEmail.password_salt)) throw new UserWrongPasswordError();

      const createTokenServiceDto: CreateTokenServiceDto = {
        ip: dto.ip,
        user_id: userWithEmail.id,
        user_agent: dto.user_agent,
      }
      //Создаем токены
      const { access_token, refreshTokenBody, refreshTokenId } = this.createTokens(createTokenServiceDto);

      const addRefreshTokenRepositoryDto: AddRefreshTokenRepositoryDto = {
        user_id: userWithEmail.id,
        token_id: refreshTokenId,
        token_body: refreshTokenBody,
      }
      //Сохраняем токен
      await this.tokenRepository.addRefreshToken(addRefreshTokenRepositoryDto);

      return { access_token, refreshTokenId };
    }catch(err){
      throw err;
    }
  }

  async refresh(dto: RefreshTokenServiceDto){
    try{      
      //Получаем старый токен из бд 
      const oldRefreshTokenBody = await this.tokenRepository.getRefreshTokenById(dto.token_id);

      //Иначе создаем новые токены
      const createTokenServiceDto: CreateTokenServiceDto = {
        ip: dto.ip,
        user_id: oldRefreshTokenBody.user_id,
        user_agent: dto.user_agent,
      }
      const { access_token, refreshTokenBody, refreshTokenId } = this.createTokens(createTokenServiceDto);

      //Удаляем старый токен
      const deleteRefreshTokenRepositoryDto: DeleteRefreshTokenRepositoryDto = {
        user_id: oldRefreshTokenBody.user_id,
        token_id: oldRefreshTokenBody.token_id,
      }
      await this.tokenRepository.deleteRefreshToken(deleteRefreshTokenRepositoryDto);

      //Сохраняем новый токен
      const addRefreshTokenRepositoryDto: AddRefreshTokenRepositoryDto = {
        user_id: oldRefreshTokenBody.user_id,
        token_id: refreshTokenId,
        token_body: refreshTokenBody,
      }
      await this.tokenRepository.addRefreshToken(addRefreshTokenRepositoryDto);

      //Возвращаем новый access_token и refreshTokenId
      return { access_token, refreshTokenId };
    }catch(err){
      throw err;
    }
  }

  async logout(token_id: string){
    try{
      //Получаем refresh токен
      const refreshTokenBody = await this.tokenRepository.getRefreshTokenById(token_id);

      //Удаляем токен
      const deleteRefreshTokenRepositoryDto: DeleteRefreshTokenRepositoryDto = {
        user_id: refreshTokenBody.user_id,
        token_id: token_id,
      }

      return await this.tokenRepository.deleteRefreshToken(deleteRefreshTokenRepositoryDto);
    }catch(err){
      throw err;
    }
  }

  async check(token: string){
    try{
      //Декодируем access токен
      const accessTokenBody = this.decodeJwt<AccessTokenBody>(token);

      return accessTokenBody;
    }catch(err){
      throw err;
    }
  }

  private createTokens(dto: CreateTokenServiceDto){

    //Получаем секретный ключ из переменных окружения
    const secretKey = process.env.JWT_SECRET;
    //Если ключа нет -> ошибка
    if(!secretKey) throw new NoSecretKeyError();

    //Тело access токена
    const accessTokenBody: AccessTokenBody = {
      user_id: dto.user_id
    }

    //Генерируем id для рефреш токена
    const refreshTokenId = uuidv4();
    //Парсим user-agent
    const { browser, device, os } = UAParser(dto.user_agent);

    //Тело refresh токена
    const refreshTokenBody: RefreshTokenBody = {
      token_id: refreshTokenId,
      user_id: dto.user_id,
      ip: dto.ip,
      browser_name: browser.name ? browser.name : '',
      os_name: os.name ? os.name : '',
      device_type: device.type ? device.type : '',
      device_model: device.model ? device.model : '',
      created_at: Date.now()
    }

    //Подписываем аксес токен
    const access_token = jwt.sign(accessTokenBody, secretKey, {
      expiresIn: UserFieldsConfig.ACCESS_TOKEN_EXPIRE_TIME,
      algorithm: 'HS256',
    });

    return { 
      access_token, 
      refreshTokenBody, 
      refreshTokenId
    };
  }

  private decodeJwt<T extends JwtPayload>(token: string): T {
    try {
      //Получаем секретный ключ из переменных окружения
      const secretKey = process.env.JWT_SECRET;
      //Если ключа нет -> ошибка
      if(!secretKey) throw new NoSecretKeyError();

      const decoded = jwt.verify(token, secretKey) as T;
      return decoded;
    } catch (err: any) {
      //Ошибка отсутствия секретного ключа прокидывается выше
      if(err instanceof NoSecretKeyError) throw err;
      //Ошибки jwt
      switch(err.name){
        case 'TokenExpiredError': throw new TokenExpiredError();
        case 'JsonWebTokenError': throw new InvalidTokenError();
        default: throw new Error('Failed to decode token');
      }
    }
  }
}