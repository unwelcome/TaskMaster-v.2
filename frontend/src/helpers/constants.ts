export const DEVMODE = true;
export const API = 'http://localhost:8080/api';

export interface IValidator<T>{
  value: T,
  error: string,
}