export interface GetRefreshTokenByIdRepositoryDto{
  user_id: number,
  token_id: string
}

export interface AddRefreshTokenRepositoryDto{
  user_id: number,
  token_id: string,
  token: string,
}

export interface UpdateRefreshTokenRepositoryDto{
  user_id: number,
  token_id: string,
  token: string,
}

export interface DeleteRefreshTokenRepositoryDto{
  user_id: number,
  token_id: string,
  token: string,
}