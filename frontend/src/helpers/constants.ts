export const DEVMODE = true;
export const API = 'http://localhost:8080/api';

export interface IValidator<T>{
  value: T,
  error: string,
}

export interface IAPIError{
  message: string,
}

export interface IPostSignUp{
  email: string,
  password: string,
  last_name: string,
  first_name: string,
  middle_name: string,
  avatar_url: string,
}
export interface IPostSignUpAnswer{
  id: number,
}

export interface IPostLogIn{
  email: string,
  password: string
}
export interface IPostLogInAnswer{
  id: number,
  access_token: string
}