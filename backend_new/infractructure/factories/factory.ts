import { TokenRepository } from "../../core/repositories/TokenRepository/tokenRepository";
import { AccountService } from "../../core/services/AccountService/accountService";
import { TokenService } from "../../core/services/TokenService/tokenService";
import { UserService } from "../../core/services/UserService/userService";
import { AccountController } from "../controllers/accountController";
import { TokenController } from "../controllers/tokenController";
import { UserController } from "../controllers/userController";
import { TokenRepositoryImpl } from "../db/repositories/TokenRepositoryImpl";
import { UserRepositoryImpl } from "../db/repositories/UserRepositoryImpl";

//User
const userRepositoryPostgresql: UserRepositoryImpl = new UserRepositoryImpl();
const userService: UserService = new UserService(userRepositoryPostgresql);

export function getUserController(): UserController{
  const userController: UserController = new UserController(userService);
  return userController;
}

//Token
const tokenRepositoryRedis: TokenRepository = new TokenRepositoryImpl();
const tokenService: TokenService = new TokenService(tokenRepositoryRedis, userRepositoryPostgresql);

export function getTokenController(): TokenController{
  const tokenController: TokenController = new TokenController(tokenService);
  return tokenController;
}

//Account
const accountService: AccountService = new AccountService(tokenService, userService);

export function getAccountController(): AccountController{
  const accountController: AccountController = new AccountController(accountService);
  return accountController;
}