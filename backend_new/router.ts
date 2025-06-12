import { Router, Request, Response } from "express";
import { logsController } from "./infractructure/controllers/logsController";
import { getUserController } from "./infractructure/factories/userFactory";

const router = Router();

const userController = getUserController();

//Logs
router.use('/', logsController);

//Authentication
// router.use('/auth', ...);

//User
router.post('/signup', (req: Request, res: Response) => userController.createUser(req, res));
router.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));

export default router;