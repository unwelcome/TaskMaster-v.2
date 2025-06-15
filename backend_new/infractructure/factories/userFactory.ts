import { UserService } from "../../core/services/UserService/userService";
import { UserController } from "../controllers/userController";
import { UserRepositoryImpl } from "../db/repositories/UserRepositoryImpl";

export function getUserController(): UserController{
  const userRepositoryPostgresql: UserRepositoryImpl = new UserRepositoryImpl();
  const userService: UserService = new UserService(userRepositoryPostgresql);
  const userController: UserController = new UserController(userService);
  return userController;
}