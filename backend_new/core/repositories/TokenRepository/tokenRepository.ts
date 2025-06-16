import { RefreshTokenBody } from "../../models/tokenModel";
import { AddRefreshTokenRepositoryDto, DeleteRefreshTokenRepositoryDto, UpdateRefreshTokenRepositoryDto } from "./tokenRepository.dto";

export interface TokenRepository{
  getAllRefreshTokens(user_id: number): Promise<string[]>,
  getRefreshTokenById(token_id: string): Promise<RefreshTokenBody>,

  addRefreshToken(dto: AddRefreshTokenRepositoryDto): Promise<boolean>,

  updateRefreshToken(dto: UpdateRefreshTokenRepositoryDto): Promise<boolean>,

  deleteRefreshToken(dto: DeleteRefreshTokenRepositoryDto): Promise<boolean>,
}