//Login user
export interface LoginTokenServiceDto {
  ip: string,
  email: string,
  password: string,
  user_agent: string,
}

//Create access and refresh tokens
export interface CreateTokenServiceDto {
  ip: string,
  user_id: number,
  user_agent: string,
}

//Refresh access and refresh tokens
export interface RefreshTokenServiceDto{
  ip: string,
  token_id: string,
  user_agent: string,
}

//Delete token by id
export interface DeleteRefreshTokenServiceDto{
  user_id: number,
  token_id: string,
}

//Delete all tokens
export interface DeleteAllRefreshTokenServiceDto{
  ip: string,
  user_id: number,
  user_agent: string,
}
