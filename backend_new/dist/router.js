"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logsController_1 = require("./infractructure/controllers/logsController");
const userController_1 = require("./infractructure/controllers/userController");
const userService_1 = require("./core/services/userService/userService");
const UserRepositoryImpl_1 = require("./infractructure/db/repositories/UserRepositoryImpl");
const router = (0, express_1.Router)();
const userRepositoryPostgresql = new UserRepositoryImpl_1.UserRepositoryImpl();
const userService = new userService_1.UserService(userRepositoryPostgresql);
const userController = new userController_1.UserController(userService);
//Logs
router.use('/', logsController_1.logsController);
//Authentication
// router.use('/auth', ...);
//User
router.post('/signup', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
exports.default = router;
