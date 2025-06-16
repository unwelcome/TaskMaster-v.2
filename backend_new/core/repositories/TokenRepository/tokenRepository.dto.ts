import { RefreshTokenBody } from "../../models/tokenModel";


export interface AddRefreshTokenRepositoryDto{
  user_id: number,
  token_id: string,
  token_body: RefreshTokenBody,
}

export interface UpdateRefreshTokenRepositoryDto{
  user_id: number,
  token_id: string,
  token_body: RefreshTokenBody,
}

export interface DeleteRefreshTokenRepositoryDto{
  user_id: number,
  token_id: string,
}