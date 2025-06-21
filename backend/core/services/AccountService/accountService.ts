import { TokenService } from "../TokenService/tokenService";
import { UserService } from "../UserService/userService";

export class AccountService{
  constructor(readonly tokenService: TokenService,readonly userService: UserService) {}

  async deleteAccount(user_id: number){
    try{
      //Удаляем все токены пользователя
      await this.tokenService.deleteAllTokens(user_id);

      //Удаляем аккаунт пользователя
      await this.userService.delete(user_id);

      return true;
    }catch(err){
      throw err;
    }
  }
}