export const enum ErrorCode {
  // Аутентификация и авторизация
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',    // неверное тело запроса
  USER_NOT_FOUND = 'USER_NOT_FOUND',              // пользователь не найден
  TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',            // токен не найден
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",  // email уже зарегистрирован
  INVALID_TOKEN = "INVALID_TOKEN",                // Неверный токен
  TOKEN_EXPIRED = "TOKEN_EXPIRED",                // Срок действия токена истек
  MISSING_TOKEN = "MISSING_TOKEN",                // Нет JWT токена авторизации
  NOT_ENOUGH_RIGHTS = "NOT_ENOUGH_RIGHTS",        // Недостаточно прав
  WRONG_PASSWORD = "WRONG_PASSWORD",              // Неверный пароль пользователя

  // Валидация данных
  INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",                  // Неверный формат email
  INVALID_USER_PASSWORD_FORMAT = "INVALID_USER_PASSWORD_FORMAT",  // Неверный формат пароля пользователя
  INVALID_FIRST_NAME_FORMAT = "INVALID_FIRST_NAME_FORMAT",        // Неверный формат имени пользователя
  INVALID_LAST_NAME_FORMAT = "INVALID_LAST_NAME_FORMAT",          // Неверный формат фамилии пользователя
  INVALID_MIDDLE_NAME_FORMAT = "INVALID_MIDDLE_NAME_FORMAT",      // Неверный формат отчества пользователя
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",              // Отсутствует обязательное поле
  INVALID_INPUT = "INVALID_INPUT",                                // Некорректный ввод данных

  // Другие ошибки
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",  // Внутренняя ошибка сервера
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",              // Функция еще не реализована
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",            // Непредвиденная ошибка
  DATABASE_ERROR = "DATABASE_ERROR",                // Непредвиденная ошибка при запросе к бд
  NOTHING_CHANGED = "NOTHING_CHANGED",              // Без изменений
}

export const ErrorMessages = {
  // Аутентификация и авторизация
  INVALID_CREDENTIALS: {
    ru: 'Неверное тело запроса'
  },
  USER_NOT_FOUND: {
    ru: 'Пользователь не найден'
  },
  TOKEN_NOT_FOUND: {
    ru: 'Токен не найден'
  },
  EMAIL_ALREADY_EXISTS: {
    ru: 'Данная электронная почта уже используется'
  },
  INVALID_TOKEN: {
    ru: 'Неверный токен'
  },
  TOKEN_EXPIRED: {
    ru: 'Токен истек'
  },
  MISSING_TOKEN: {
    ru: 'Нет токена'
  },
  NOT_ENOUGH_RIGHTS: {
    ru: 'Недостаточно прав для выполнения действия'
  },
  WRONG_PASSWORD: {
    ru: 'Неверный пароль'
  },

  // Валидация данных
  INVALID_EMAIL_FORMAT: {
    ru: 'Неверный формат электронной почты'
  },
  INVALID_USER_PASSWORD_FORMAT: {
    ru: 'Неверный формат пароля пользователя'
  },
  INVALID_FIRST_NAME_FORMAT: {
    ru: 'Неверное имя пользователя'
  },
  INVALID_LAST_NAME_FORMAT: {
    ru: 'Неверная фамилия пользователя'
  },
  INVALID_MIDDLE_NAME_FORMAT: {
    ru: 'Неверное отчество пользователя'
  },
  MISSING_REQUIRED_FIELD: {
    ru: 'Отсутствует обязательное поле'
  },
  INVALID_INPUT: {
    ru: 'Неверные данные'
  },

  // Другие ошибки
  INTERNAL_SERVER_ERROR: {
    ru: 'Внутренняя ошибка сервера'
  },
  NOT_IMPLEMENTED: {
    ru: 'Функция находится на стадии разработки'
  },
  UNEXPECTED_ERROR: {
    ru: 'Непредвиденная ошибка'
  },
  DATABASE_ERROR: {
    ru: 'Неудалось подключиться к базе данных'
  },
  NOTHING_CHANGED: {
    ru: 'Без изменений'
  },
}