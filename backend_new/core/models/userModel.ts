export interface User{
  id: number,
  password_hash: string,
  password_salt: string,
  email: string,
  first_name: string,
  last_name: string,
  middle_name: string,
  created_at: Date,
  avatar_url: string | null
}