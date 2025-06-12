"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.UserRepositoryImpl = void 0;
const dbErrors_1 = require("../../../core/errors/dbErrors");
const db = __importStar(require("../postgresql"));
const userErrors_1 = require("../../../core/errors/userErrors");
class UserRepositoryImpl {
    checkUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('SELECT 1 FROM users WHERE email = $1', [email]);
                return result.rowCount !== null && result.rowCount > 0;
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Check user exists error');
            }
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('INSERT INTO users (password_hash, password_salt, email, last_name, first_name, middle_name, avatar_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [dto.password_hash, dto.password_salt, dto.email, dto.last_name, dto.first_name, dto.middle_name, dto.avatar_url]);
                return result.rows[0];
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Create user error');
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('SELECT * FROM users');
                return result.rows;
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Get all users error');
            }
        });
    }
    getAllByGroupId(group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('SELECT u.* FROM group_members AS gm JOIN users AS u ON gm.user_id = u.id WHERE group_id = $1', [group_id]);
                return result.rows;
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Get all users error');
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('SELECT * FROM users WHERE id = $1', [id]);
                return result.rows[0];
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Get user by id error');
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('SELECT * FROM users WHERE email = $1', [email]);
                return result.rows[0];
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Get user by email error');
            }
        });
    }
    updatePassword(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('UPDATE users SET password_hash = $2, password_salt = $3 WHERE id = $1', [dto.id, dto.password_hash, dto.password_salt]);
                if (result.rowCount === 0)
                    throw new userErrors_1.UserNotFoundError(dto.id);
                return result.rows[0];
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Update user password error');
            }
        });
    }
    updateEmail(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('UPDATE users SET email = $2 WHERE id = $1', [dto.id, dto.email]);
                if (result.rowCount === 0)
                    throw new userErrors_1.UserNotFoundError(dto.id);
                return result.rows[0];
            }
            catch (err) {
                if (err.code === '23505') { // Ошибка нарушения уникальности email
                    throw new dbErrors_1.PostgreSQLUniqueError(`email: ${dto.email} already exists`);
                }
                else
                    throw new dbErrors_1.PostgreSQLError('Update user email error');
            }
        });
    }
    updateFio(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('UPDATE users SET avatar_url = $2 WHERE id = $1', [dto.id, dto.avatar_url]);
                if (result.rowCount === 0)
                    throw new userErrors_1.UserNotFoundError(dto.id);
                return result.rows[0];
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Update user avatar_url error');
            }
        });
    }
    updateAvatar(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('UPDATE users SET first_name = $2, last_name = $3, middle_name = $3 WHERE id = $1', [dto.id, dto.first_name, dto.last_name, dto.middle_name]);
                if (result.rowCount === 0)
                    throw new userErrors_1.UserNotFoundError(dto.id);
                return result.rows[0];
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Update user fio error');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.query('DELETE FROM users WHERE id = $1', [id]);
                if (result.rowCount === 0)
                    throw new userErrors_1.UserNotFoundError(id);
                return result.rows[0];
            }
            catch (err) {
                throw new dbErrors_1.PostgreSQLError('Delete user error');
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
