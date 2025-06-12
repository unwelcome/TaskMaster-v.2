"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
exports.ErrorMessages = {
    // Аутентификация и авторизация
    INVALID_CREDENTIALS: {
        ru: 'Неверное тело запроса'
    },
    USER_NOT_FOUND: {
        ru: 'Пользователь не найден'
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
    NOT_ENOUGH_RIGHTS: {
        ru: 'Недостаточно прав для выполнения действия'
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
    // Другие ошибки
    MISSING_REQUIRED_FIELD: {
        ru: 'Отсутствует обязательное поле'
    },
    INVALID_INPUT: {
        ru: 'Неверные данные'
    },
    INTERNAL_SERVER_ERROR: {
        ru: 'Внутренняя ошибка сервера'
    },
    NOT_IMPLEMENTED: {
        ru: 'Функция находится на стадии разработки'
    },
};
