"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = exports.UserAlreadyExistsError = void 0;
class UserAlreadyExistsError extends Error {
    constructor(email) {
        super(`User with email ${email} already exists.`);
        this.email = email;
        this.name = 'UserAlreadyExistsError';
        Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class UserNotFoundError extends Error {
    constructor(id) {
        super(`User with ID ${id} not found.`);
        this.id = id;
        this.name = 'UserNotFoundError';
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
    }
}
exports.UserNotFoundError = UserNotFoundError;
