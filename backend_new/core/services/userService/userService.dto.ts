//Create user
export interface CreateUserServiceDto {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  middle_name: string | null,
}

//Login user
export interface LoginUserServiceDto {
  email: string,
  password: string,
}

//Update user password
export interface UpdateUserPasswordServiceDto{
  id: number,
  password: string,
}

//Update user email 
export interface UpdateUserEmailServiceDto{
  id: number,
  email: string,
}

//Update user avatar
export interface UpdateUserAvatarServiceDto{
  id: number,
  avatar_url: string | null,
}

//Update user FIO
export interface UpdateUserFioServiceDto{
  id: number,
  first_name: string,
  last_name: string,
  middle_name: string | null,
}