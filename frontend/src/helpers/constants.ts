export const DEVMODE = true;
export const API = 'http://localhost:8080/api';

// export enum EGroupRoles {
//   "student",
//   "senior",
//   "teacher"
// }

// export enum EGroupStatus {
//   "open",
//   "close"
// }

// export enum EChatStatus {
//   "open",
//   "close"
// }

// export enum ETopicStatus {
//   "open",
//   "close"
// }

//ALL
export interface IValidator<T>{
  value: T,
  error: string,
}
export interface IAPIError{
  message: string,
}
//USER
export interface IGetUserInfoAnswer{
  id: number,
  first_name: string,
  last_name: string,
  middle_name: string,
  avatar_url: string,
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
//GROUP
export interface IGetUserGroupsAnswer{
  group_id: number,
  role: string,
  title: string
}
export interface IGetGroupInfoAnswer{
  id: number,
  title: string,
  score_limit: number,
  topic_limit: number,
  group_status: string, // "open" / "close"
  chat_status: string, // "open" / "close"
  enable_senior: boolean
}
export interface IPostGroupCreate{
  title: string,
  password: string
}
export interface IPostGroupCreateAnswer{
  id: number
}
export interface IPutGroupSettings{
  title: string,
  score_limit: number,
  topic_limit: number,
  group_status: string, // "open" / "close"
  chat_status: string, // "open" / "close"
  enable_senior: boolean
}
export interface IPutGroupSettingsAnswer{
  id: number
}
export interface IDeleteGroupAnswer{
  id: number
}