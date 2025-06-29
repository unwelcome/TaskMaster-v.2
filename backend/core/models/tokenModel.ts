export interface RefreshTokenBody{
  token_id: string,
  user_id: number,
  ip: string,
  browser_name: string,
  os_name: string,
  device_type: string,
  device_model: string,
  created_at: number,
}

export interface AccessTokenBody{
  user_id: number,
}