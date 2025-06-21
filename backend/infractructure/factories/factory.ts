import { UserRepository } from "../../core/repositories/UserRepository/userRepository";
import { UserRepositoryImpl } from "../db/repositories/UserRepositoryImpl";
import { UserService } from "../../core/services/UserService/userService";
import { UserController } from "../controllers/userController";

import { TokenRepository } from "../../core/repositories/TokenRepository/tokenRepository";
import { TokenRepositoryImpl } from "../db/repositories/TokenRepositoryImpl";
import { TokenService } from "../../core/services/TokenService/tokenService";
import { TokenController } from "../controllers/tokenController";

import { AccountService } from "../../core/services/AccountService/accountService";
import { AccountController } from "../controllers/accountController";

import { GroupRepository } from "../../core/repositories/GroupRepository/groupRepository";
import { GroupRepositoryImpl } from "../db/repositories/GroupRepositoryImpl";
import { GroupService } from "../../core/services/GroupService/groupService";
import { GroupController } from "../controllers/groupController";

//User
const userRepositoryPostgresql: UserRepository = new UserRepositoryImpl();
const userService: UserService = new UserService(userRepositoryPostgresql);
const userController: UserController = new UserController(userService);

export function getUserController(): UserController{
  return userController;
}

//Token
const tokenRepositoryRedis: TokenRepository = new TokenRepositoryImpl();
const tokenService: TokenService = new TokenService(tokenRepositoryRedis, userRepositoryPostgresql);
const tokenController: TokenController = new TokenController(tokenService);

export function getTokenController(): TokenController{
  return tokenController;
}

//Account
const accountService: AccountService = new AccountService(tokenService, userService);
const accountController: AccountController = new AccountController(accountService);

export function getAccountController(): AccountController{
  return accountController;
}

//Group
const groupRepositoryPostgresql: GroupRepository = new GroupRepositoryImpl();
const groupService: GroupService = new GroupService(groupRepositoryPostgresql);
const groupController: GroupController = new GroupController(groupService);

export function getGroupController(): GroupController{
  return groupController;
}