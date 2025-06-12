import { Router, Request, Response } from "express";
import { logsController } from "./infractructure/controllers/logsController";

import { UserController } from "./infractructure/controllers/userController";
import { UserService } from "./core/services/userService/userService";
import { UserRepositoryImpl } from "./infractructure/db/repositories/UserRepositoryImpl";

const router = Router();

const userRepositoryPostgresql: UserRepositoryImpl = new UserRepositoryImpl();
const userService: UserService = new UserService(userRepositoryPostgresql);
const userController: UserController = new UserController(userService);


//Logs
router.use('/', logsController);

//Authentication
// router.use('/auth', ...);

//User
router.post('/signup', (req: Request, res: Response) => userController.createUser(req, res));
router.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));

export default router;