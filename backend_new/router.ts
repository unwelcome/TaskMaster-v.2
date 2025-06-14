import { Router, Request, Response } from "express";
import { logsController } from "./infractructure/controllers/logsController";
import { authController } from "./infractructure/controllers/authController";
import { getUserController } from "./infractructure/factories/userFactory";

const router = Router();

const userController = getUserController();

//Logs
router.use(logsController);

//Authentication
router.use('/auth', authController);

//User routes
router.get('/auth/users', (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get('/user/:id', (req: Request, res: Response) => userController.getUserById(req, res));
router.get('/user', (req: Request, res: Response) => userController.getUserByEmail(req, res));
router.get('/group/:group_id/users', (req: Request, res: Response) => userController.getAllUsersByGroupId(req, res)); // remove to groups routes
router.post('/signup', (req: Request, res: Response) => userController.createUser(req, res));
router.post('/login', (req: Request, res: Response) => userController.loginUser(req, res));
router.patch('/user/:id/password', (req: Request, res: Response) => userController.updateUserPassword(req, res)); // брать userID из токена а не из адреса!
router.patch('/user/:id/email', (req: Request, res: Response) => userController.updateUserEmail(req, res)); // брать userID из токена а не из адреса!
router.patch('/user/:id/fio', (req: Request, res: Response) => userController.updateUserFio(req, res)); // брать userID из токена а не из адреса!
router.patch('/user/:id/avatar', (req: Request, res: Response) => userController.updateUserAvatar(req, res)); // брать userID из токена а не из адреса!
router.delete('/user/:id', (req: Request, res: Response) => userController.deleteUser(req, res)); // брать userID из токена а не из адреса!

export default router;