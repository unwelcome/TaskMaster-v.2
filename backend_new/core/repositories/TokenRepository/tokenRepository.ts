import { RefreshTokenDB } from "../../models/tokenModel";
import { AddRefreshTokenRepositoryDto, DeleteRefreshTokenRepositoryDto, GetRefreshTokenByIdRepositoryDto, UpdateRefreshTokenRepositoryDto } from "./tokenRepository.dto";

export interface TokenRepository{
  getAllRefreshTokens(user_id: number): Promise<string[]>,
  getRefreshTokenById(dto: GetRefreshTokenByIdRepositoryDto): Promise<RefreshTokenDB>,

  addRefreshToken(dto: AddRefreshTokenRepositoryDto): Promise<boolean>,

  updateRefreshToken(dto: UpdateRefreshTokenRepositoryDto): Promise<boolean>,

  deleteRefreshToken(dto: DeleteRefreshTokenRepositoryDto): Promise<boolean>,
}