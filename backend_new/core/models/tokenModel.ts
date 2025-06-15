export interface RefreshTokenBody{
  token_id: string,
  user_id: number,
  ip: string,
  browser_name: string,
  os_name: string,
  device_type: string,
  device_model: string,
}

export interface RefreshTokenDB{
  token_id: string,
  token: string, // jwt.encode(RefreshTokenBody)
}

export interface AccessTokenBody{
  user_id: number,
}