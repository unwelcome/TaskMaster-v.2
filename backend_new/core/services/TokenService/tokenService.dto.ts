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
  token: string,
  user_agent: string,
}