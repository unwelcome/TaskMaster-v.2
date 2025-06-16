import { UserFieldsConfig } from "../../../common/fieldsConfig";
import { TokenNotFoundError } from "../../../core/errors/tokenErrors";
import { RefreshTokenBody } from "../../../core/models/tokenModel";
import { TokenRepository } from "../../../core/repositories/TokenRepository/tokenRepository";
import { AddRefreshTokenRepositoryDto, DeleteRefreshTokenRepositoryDto } from "../../../core/repositories/TokenRepository/tokenRepository.dto";
import redis from "../redis";

export class TokenRepositoryImpl implements TokenRepository{
  private getTokenTable(token_id: string): string{
    return `refresh_token:${token_id}`;
  }

  private getUserTokensTable(user_id: number): string{
    return `user:${user_id}:refresh_tokens`;
  }

  async getAllRefreshTokens(user_id: number): Promise<RefreshTokenBody[]> {
    const refreshTokensId = await redis.smembers(this.getUserTokensTable(user_id));
    
    if(!refreshTokensId || refreshTokensId.length === 0) return ([] as RefreshTokenBody[]);

    const refreshTokens = [] as RefreshTokenBody[];

    for(const refreshTokenUUID of refreshTokensId){
      const currentRefreshToken = await this.getRefreshTokenById(refreshTokenUUID);
      if(currentRefreshToken) refreshTokens.push(currentRefreshToken);
    }

    return refreshTokens;
  }

  async getAllRefreshTokensId(user_id: number): Promise<string[]> {
    const refreshTokensId = await redis.smembers(this.getUserTokensTable(user_id));
    
    if(!refreshTokensId || refreshTokensId.length === 0) return [];

    return refreshTokensId;
  }

  async getRefreshTokenById(token_id: string): Promise<RefreshTokenBody> {
    const refreshTokenBody = await redis.get(this.getTokenTable(token_id));

    if(!refreshTokenBody || Object.keys(refreshTokenBody).length === 0) throw new TokenNotFoundError();

    return await JSON.parse(refreshTokenBody);
  }

  async addRefreshToken(dto: AddRefreshTokenRepositoryDto): Promise<boolean> {
    const token_body_string = JSON.stringify(dto.token_body);

    //Создаем транзакцию
    const transaction = redis.multi();

    //Сохраняем id токена пользователю
    transaction.sadd(this.getUserTokensTable(dto.user_id), dto.token_id);
    //Сохраняем тело токена
    transaction.set(this.getTokenTable(dto.token_id), token_body_string);
    //Устанавливаем время жизни для обоих
    transaction.pexpire(this.getUserTokensTable(dto.user_id), UserFieldsConfig.REFRESH_TOKEN_EXPIRE_TIME * 1000);
    transaction.pexpire(this.getTokenTable(dto.token_id), UserFieldsConfig.REFRESH_TOKEN_EXPIRE_TIME * 1000);

    await transaction.exec();
    return true;
  }

  async deleteRefreshToken(dto: DeleteRefreshTokenRepositoryDto): Promise<boolean> {
    const transaction = redis.multi();

    //Удаляем id токена из set-а пользователя
    transaction.srem(this.getUserTokensTable(dto.user_id), dto.token_id);
    //Удаляем тело токена
    transaction.del(this.getTokenTable(dto.token_id));

    await transaction.exec();
    return true;
  }

  async deleteAllRefreshTokens(user_id: number): Promise<boolean> {
    //Получаем все токены пользователя
    const refreshTokensId = await redis.smembers(this.getUserTokensTable(user_id));

    const transaction = redis.multi();

    //Удаляем каждое тело токена
    for(const refreshTokenUUID of refreshTokensId){
      transaction.del(this.getTokenTable(refreshTokenUUID));
    }
    //Удаляем сет токенов у пользователя
    transaction.del(this.getUserTokensTable(user_id));

    await transaction.exec();
    return true;
  }
}