export interface CreateUserServiceDto {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  middle_name: string | null,
}