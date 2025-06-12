"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
const node_crypto_1 = require("node:crypto");
function hashPassword(password, _salt = null) {
    const salt = (_salt === null) ? (0, node_crypto_1.randomBytes)(128).toString('base64') : _salt;
    const iterations = 10;
    const hash = (0, node_crypto_1.pbkdf2Sync)(password, salt, iterations, 128, 'sha512').toString('base64');
    return { salt: salt, hash: hash };
}
function checkPassword(password, passwordHash, passwordSalt) {
    const { salt, hash } = hashPassword(password, passwordSalt);
    return hash === passwordHash;
}
