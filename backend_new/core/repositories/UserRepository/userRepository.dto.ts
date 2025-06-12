//Create user
export interface CreateUserRepositoryDto{
  password_hash: string,
  password_salt: string,
  email: string,
  first_name: string,
  last_name: string,
  middle_name: string | null,
  avatar_url: string | null,
}

//Update user password
export interface UpdateUserPasswordRepositoryDto{
  id: number,
  password_hash: string,
  password_salt: string,
}

//Update user email 
export interface UpdateUserEmailRepositoryDto{
  id: number,
  email: string,
}

//Update user avatar
export interface UpdateUserAvatarRepositoryDto{
  id: number,
  avatar_url: string,
}

//Update user FIO
export interface UpdateUserFioRepositoryDto{
  id: number,
  first_name: string,
  last_name: string,
  middle_name: string | null,
}