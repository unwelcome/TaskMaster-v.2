"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLUniqueError = exports.PostgreSQLError = void 0;
class PostgreSQLError extends Error {
    constructor(message) {
        super(`PostgreSQL unexpected error: ${message}`);
        this.message = message;
        Object.setPrototypeOf(this, PostgreSQLError.prototype);
    }
}
exports.PostgreSQLError = PostgreSQLError;
class PostgreSQLUniqueError extends Error {
    constructor(message) {
        super(`PostgreSQL unique constraint error: ${message}`);
        this.message = message;
        Object.setPrototypeOf(this, PostgreSQLError.prototype);
    }
}
exports.PostgreSQLUniqueError = PostgreSQLUniqueError;
