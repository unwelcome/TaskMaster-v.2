import { UserFieldsConfig } from "../../../common/fieldsConfig";
import { checkPassword } from "../../../common/passwordHelpers";
import { InvalidTokenError, NoSecretKeyError, TokenExpiredError, TokenNotFoundError } from "../../errors/tokenErrors";
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
      const { access_token, refresh_token, refresh_token_id } = this.createTokens(createTokenServiceDto);

      const addRefreshTokenRepositoryDto: AddRefreshTokenRepositoryDto = {
        user_id: userWithEmail.id,
        token_id: refresh_token_id,
        token: refresh_token,
      }
      //Сохраняем токен
      await this.tokenRepository.addRefreshToken(addRefreshTokenRepositoryDto);

      return { access_token, refresh_token };
    }catch(err){
      throw err;
    }
  }

  async refresh(dto: RefreshTokenServiceDto){
    try{
      //Декодируем refresh токен
      const refreshTokenBody = this.decodeJwt<RefreshTokenBody>(dto.token);

      //Получаем все refresh токены пользователя
      const userTokens = await this.tokenRepository.getAllRefreshTokens(refreshTokenBody.user_id);

      //Проверяем чтобы текущий токен был в списке, если нет - его скомпрометировали
      if(!userTokens.includes(dto.token)) throw new TokenNotFoundError();

      //Иначе создаем новые токены
      const createTokenServiceDto: CreateTokenServiceDto = {
        ip: dto.ip,
        user_id: refreshTokenBody.user_id,
        user_agent: dto.user_agent,
      }
      const { access_token, refresh_token, refresh_token_id } = this.createTokens(createTokenServiceDto);

      //Удаляем старый токен
      const deleteRefreshTokenRepositoryDto: DeleteRefreshTokenRepositoryDto = {
        user_id: refreshTokenBody.user_id,
        token_id: refreshTokenBody.token_id,
        token: dto.token,
      }
      await this.tokenRepository.deleteRefreshToken(deleteRefreshTokenRepositoryDto);

      //Сохраняем новый токен
      const addRefreshTokenRepositoryDto: AddRefreshTokenRepositoryDto = {
        user_id: refreshTokenBody.user_id,
        token_id: refresh_token_id,
        token: refresh_token,
      }
      await this.tokenRepository.addRefreshToken(addRefreshTokenRepositoryDto);

      //Возвращаем новые токены
      return { access_token, refresh_token };
    }catch(err){
      throw err;
    }
  }

  async logout(token: string){
    try{
      //Декодируем refresh токен
      const refreshTokenBody = this.decodeJwt<RefreshTokenBody>(token);

      //Получаем все refresh токены пользователя
      const userTokens = await this.tokenRepository.getAllRefreshTokens(refreshTokenBody.user_id);

      //Проверяем чтобы текущий токен был в списке, если нет - его скомпрометировали
      if(!userTokens.includes(token)) throw new TokenNotFoundError();

      //Удаляем токен
      const deleteRefreshTokenRepositoryDto: DeleteRefreshTokenRepositoryDto = {
        user_id: refreshTokenBody.user_id,
        token_id: refreshTokenBody.token_id,
        token: token,
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
    }
    //Подписываем аксес токен
    const access_token = jwt.sign(accessTokenBody, secretKey, {
      expiresIn: UserFieldsConfig.ACCESS_TOKEN_EXPIRE_TIME,
      algorithm: 'HS256',
    });
    //Подписываем рефреш токен
    const refresh_token = jwt.sign(refreshTokenBody, secretKey, {
      expiresIn: UserFieldsConfig.REFRESH_TOKEN_EXPIRE_TIME,
      algorithm: 'HS256',
    });

    return { 
      access_token, 
      refresh_token, 
      refresh_token_id: refreshTokenId 
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