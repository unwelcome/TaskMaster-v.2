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
exports.UserService = void 0;
const passwordHelpers_1 = require("../../../common/passwordHelpers");
const userErrors_1 = require("../../errors/userErrors");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash, salt } = (0, passwordHelpers_1.hashPassword)(dto.password);
            const createUserDto = {
                password_hash: hash,
                password_salt: salt,
                email: dto.email,
                first_name: dto.first_name,
                last_name: dto.last_name,
                middle_name: dto.middle_name,
                avatar_url: null,
            };
            if (yield this.userRepository.checkUserExists(dto.email)) {
                throw new userErrors_1.UserAlreadyExistsError(dto.email);
            }
            return this.userRepository.create(createUserDto);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getAll();
        });
    }
}
exports.UserService = UserService;
