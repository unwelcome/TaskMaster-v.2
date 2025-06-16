import { RefreshTokenBody } from "../../models/tokenModel";
import { AddRefreshTokenRepositoryDto, DeleteRefreshTokenRepositoryDto } from "./tokenRepository.dto";

export interface TokenRepository{
  getAllRefreshTokens(user_id: number): Promise<RefreshTokenBody[]>,

  getAllRefreshTokensId(user_id: number): Promise<string[]>,
  
  getRefreshTokenById(token_id: string): Promise<RefreshTokenBody>,

  addRefreshToken(dto: AddRefreshTokenRepositoryDto): Promise<boolean>,

  deleteRefreshToken(dto: DeleteRefreshTokenRepositoryDto): Promise<boolean>,

  deleteAllRefreshTokens(user_id: number): Promise<boolean>,
}