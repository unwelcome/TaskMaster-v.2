import { Router, Request, Response, NextFunction } from "express";
import { logsController } from "./infractructure/controllers/logsController";
import { devController } from "./infractructure/controllers/devController";
import { getTokenController, getUserController } from "./infractructure/factories/factory";
import { AuthRequest } from "./common/interfaces";

const router = Router();

const userController = getUserController();
const tokenController = getTokenController();

//Logs
router.use(logsController);

//Dev
router.use('/dev', devController);

//Authentication
router.use('/auth', (req: Request, res: Response, next: NextFunction) => tokenController.checkAuth(req, res, next));
router.get('/refresh', (req :Request, res: Response) => tokenController.refresh(req, res));
router.get('/auth/tokens', (req: Request, res: Response) => tokenController.getAllTokens(req as AuthRequest, res));
router.post('/login', (req: Request, res: Response) => tokenController.login(req, res));
router.post('/logout', (req: Request, res: Response) => tokenController.logout(req, res));
router.delete('/auth/token', (req: Request, res: Response) => tokenController.closeToken(req as AuthRequest, res));
router.delete('/auth/tokens', (req: Request, res: Response) => tokenController.closeAllExceptCurrent(req as AuthRequest, res));

//User routes
router.get('/dev/users', (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get('/auth/user', (req: Request, res: Response) => userController.getUser(req as AuthRequest, res));
router.get('/dev/user/id/:id', (req: Request, res: Response) => userController.getUserById(req, res));
router.get('/dev/user/email', (req: Request, res: Response) => userController.getUserByEmail(req, res));
router.get('/group/:group_id/users', (req: Request, res: Response) => userController.getAllUsersByGroupId(req, res)); // remove to groups routes
router.post('/signup', (req: Request, res: Response) => userController.createUser(req, res));
router.patch('/auth/user/:id/password', (req: Request, res: Response) => userController.updateUserPassword(req as AuthRequest, res));
router.patch('/auth/user/:id/email', (req: Request, res: Response) => userController.updateUserEmail(req as AuthRequest, res));
router.patch('/auth/user/:id/fio', (req: Request, res: Response) => userController.updateUserFio(req as AuthRequest, res));
router.patch('/auth/user/:id/avatar', (req: Request, res: Response) => userController.updateUserAvatar(req as AuthRequest, res));
router.delete('/dev/user/:id', (req: Request, res: Response) => userController.deleteUserById(req, res));
router.delete('/auth/user', (req: Request, res: Response) => userController.deleteUser(req as AuthRequest, res));

export default router;