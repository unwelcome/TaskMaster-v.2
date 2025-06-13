import { Router, Request, Response } from "express";
import { logsController } from "./infractructure/controllers/logsController";
import { getUserController } from "./infractructure/factories/userFactory";

const router = Router();

const userController = getUserController();

//Logs
router.use(logsController);

//Authentication
// router.use('/auth', ...);

//User routes
router.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get('/user/:id', (req: Request, res: Response) => userController.getUserById(req, res));
router.get('/user', (req: Request, res: Response) => userController.getUserByEmail(req, res));
router.get('/group/:group_id/users', (req: Request, res: Response) => userController.getAllUsersByGroupId(req, res)); // remove to groups routes
router.post('/signup', (req: Request, res: Response) => userController.createUser(req, res));
router.post('/login', (req: Request, res: Response) => userController.loginUser(req, res));
router.put('/user/:id/password', (req: Request, res: Response) => userController.updateUserPassword(req, res)); // брать userID из токена а не из адреса!
router.put('/user/:id/email', (req: Request, res: Response) => userController.updateUserEmail(req, res)); // брать userID из токена а не из адреса!
router.put('/user/:id/fio', (req: Request, res: Response) => userController.updateUserFio(req, res)); // брать userID из токена а не из адреса!

export default router;