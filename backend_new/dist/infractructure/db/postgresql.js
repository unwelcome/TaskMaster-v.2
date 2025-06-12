"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
const pg_1 = require("pg");
const host = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST : 'localhost';
const port = process.env.POSTGRES_PORT === undefined ? 5432 : parseInt(process.env.POSTGRES_PORT);
const database = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const pool = new pg_1.Pool({
    host: host,
    port: port,
    database: database,
    user: user,
    password: password
});
// Функция для выполнения SQL запросов
function query(text, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(text, params);
            return result;
        }
        catch (error) {
            console.error('PostgreSQL Error: executing query', text, error);
            throw error;
        }
    });
}
