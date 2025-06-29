export const UserFieldsConfig = {
  EMAIL_MIN_LENGTH: 3,
  EMAIL_MAX_LENGTH: 254,

  PASSWORD_MIN_LENGTH: 2,
  PASSWORD_MAX_LENGTH: 40,

  FIRST_NAME_MIN_LENGTH: 2,
  FIRST_NAME_MAX_LENGTH: 50,

  LAST_NAME_MIN_LENGTH: 3,
  LAST_NAME_MAX_LENGTH: 50,

  MIDDLE_NAME_MIN_LENGTH: 0,
  MIDDLE_NAME_MAX_LENGTH: 50,

  ACCESS_TOKEN_EXPIRE_TIME: 60 * 5, // 5 min
  ACCESS_HTTP_ONLY: false,
  ACCESS_PATH: '/api',
  ACCESS_SECURE: process.env.NODE_ENV === 'production',
  ACCESS_SAMESITE: 'strict' as boolean | "strict" | "none" | "lax" | undefined,
  
  REFRESH_TOKEN_EXPIRE_TIME: 60 * 60 * 24 * 7, // 7 days
  REFRESH_HTTP_ONLY: true,
  REFRESH_PATH: '/api',
  REFRESH_SECURE: process.env.NODE_ENV === 'production',
  REFRESH_SAMESITE: 'strict' as boolean | "strict" | "none" | "lax" | undefined,
}

export const GroupFieldsConfig = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 254,

  PASSWORD_MIN_LENGTH: 2,
  PASSWORD_MAX_LENGTH: 40,
}