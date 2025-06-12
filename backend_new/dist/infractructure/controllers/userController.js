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
exports.UserController = void 0;
const userErrors_1 = require("../../core/errors/userErrors");
const fieldsConfig_1 = require("../../common/fieldsConfig");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, first_name, last_name, middle_name } = req.body;
                //Exists required fields
                if (!email || !password || !first_name || !last_name) {
                    res.status(400).json({
                        error: {
                            message: 'Missing required fields',
                            code: "MISSING_REQUIRED_FIELD" /* ErrorCode.MISSING_REQUIRED_FIELD */
                        }
                    });
                    return;
                }
                //Email validation
                if (email.length < fieldsConfig_1.UserFieldsConfig.EMAIL_MIN_LENGTH || email.length > fieldsConfig_1.UserFieldsConfig.EMAIL_MAX_LENGTH) {
                    res.status(422).json({
                        error: {
                            message: 'Invalid email',
                            code: "INVALID_EMAIL_FORMAT" /* ErrorCode.INVALID_EMAIL_FORMAT */
                        }
                    });
                    return;
                }
                //Password validation
                if (password.length < fieldsConfig_1.UserFieldsConfig.PASSWORD_MIN_LENGTH || password.length > fieldsConfig_1.UserFieldsConfig.PASSWORD_MAX_LENGTH) {
                    res.status(422).json({
                        error: {
                            message: 'Invalid user password',
                            code: "INVALID_USER_PASSWORD_FORMAT" /* ErrorCode.INVALID_USER_PASSWORD_FORMAT */
                        }
                    });
                    return;
                }
                //FirstName validation
                if (first_name.length < fieldsConfig_1.UserFieldsConfig.FIRST_NAME_MIN_LENGTH || first_name.length > fieldsConfig_1.UserFieldsConfig.FIRST_NAME_MAX_LENGTH) {
                    res.status(422).json({
                        error: {
                            message: 'Invalid first name',
                            code: "INVALID_FIRST_NAME_FORMAT" /* ErrorCode.INVALID_FIRST_NAME_FORMAT */
                        }
                    });
                    return;
                }
                //LastName validation
                if (last_name.length < fieldsConfig_1.UserFieldsConfig.LAST_NAME_MIN_LENGTH || last_name.length > fieldsConfig_1.UserFieldsConfig.LAST_NAME_MAX_LENGTH) {
                    res.status(422).json({
                        error: {
                            message: 'Invalid last name',
                            code: "INVALID_LAST_NAME_FORMAT" /* ErrorCode.INVALID_LAST_NAME_FORMAT */
                        }
                    });
                    return;
                }
                //MiddleName validation
                if (middle_name !== undefined && (middle_name.length < fieldsConfig_1.UserFieldsConfig.MIDDLE_NAME_MIN_LENGTH || middle_name.length > fieldsConfig_1.UserFieldsConfig.MIDDLE_NAME_MAX_LENGTH)) {
                    res.status(422).json({
                        error: {
                            message: 'Invalid middle name',
                            code: "INVALID_MIDDLE_NAME_FORMAT" /* ErrorCode.INVALID_MIDDLE_NAME_FORMAT */
                        }
                    });
                    return;
                }
                const createUserServiceDto = {
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    middle_name: middle_name === undefined ? null : middle_name,
                };
                const user = yield this.userService.create(createUserServiceDto);
                res.status(201).json({
                    id: user.id
                });
            }
            catch (err) {
                if (err instanceof userErrors_1.UserAlreadyExistsError) {
                    res.status(409).json({
                        error: {
                            message: 'User already exists',
                            code: "EMAIL_ALREADY_EXISTS" /* ErrorCode.EMAIL_ALREADY_EXISTS */
                        }
                    });
                    return;
                }
                res.status(400).json({
                    error: {
                        message: 'Create user unexpected error',
                        code: "UNEXPECTED_ERROR" /* ErrorCode.UNEXPECTED_ERROR */
                    }
                });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAll();
                res.status(200).json(users);
            }
            catch (e) {
                res.status(500).json({
                    error: {
                        message: "Internal server error",
                        code: "INTERNAL_SERVER_ERROR" /* ErrorCode.INTERNAL_SERVER_ERROR */
                    }
                });
            }
        });
    }
}
exports.UserController = UserController;
