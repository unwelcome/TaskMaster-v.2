import { TokenRepository } from "../../core/repositories/TokenRepository/tokenRepository";
import { TokenService } from "../../core/services/TokenService/tokenService";
import { UserService } from "../../core/services/UserService/userService";
import { TokenController } from "../controllers/tokenController";
import { UserController } from "../controllers/userController";
import { TokenRepositoryImpl } from "../db/repositories/TokenRepositoryImpl";
import { UserRepositoryImpl } from "../db/repositories/UserRepositoryImpl";

const userRepositoryPostgresql: UserRepositoryImpl = new UserRepositoryImpl();

export function getUserController(): UserController{
  const userService: UserService = new UserService(userRepositoryPostgresql);
  const userController: UserController = new UserController(userService);
  return userController;
}

export function getTokenController(): TokenController{
  const tokenRepositoryRedis: TokenRepository = new TokenRepositoryImpl();
  const tokenService: TokenService = new TokenService(tokenRepositoryRedis, userRepositoryPostgresql);
  const tokenController: TokenController = new TokenController(tokenService);
  return tokenController;
}