import axios from "axios";
import { API, DEVMODE, 
  type IAPIError, 
  type IGetUserInfoAnswer, 
  type IPostLogIn, type IPostLogInAnswer, 
  type IPostSignUp, type IPostSignUpAnswer 
} from "@/helpers/constants";
import { GET_COOKIE } from "@/helpers/functions";


//GET//

// Get user info
export function API_GetUserInfo(): Promise<IGetUserInfoAnswer | any>{
  return new Promise((resolve, reject) => {
    axios.get(`${API}/auth/user`,  {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Get User info success: ', response);
      resolve(response.data as IGetUserInfoAnswer);
    })
    .catch(error => {
      if(DEVMODE) console.log('Get User info error: ', error);
      reject(error.response.data as IAPIError);
    })
  });
};

//POST//

//POST signUp user
export function API_PostSignUp(body: IPostSignUp): Promise<IPostSignUpAnswer | any>{
  return new Promise((resolve, reject) => {
    axios.post(`${API}/user/signup`, body)
    .then(response => {
      if(DEVMODE) console.log('SignUp user success: ', response);
      resolve(response.data as IPostSignUpAnswer);
    })
    .catch(error => {
      if(DEVMODE) console.log('SignUp user error: ', error);
      reject(error.response.data as IAPIError);
    })
  });
};

//POST logIn user
export function API_PostLogIn(body: IPostLogIn): Promise<IPostLogInAnswer | any>{
  return new Promise((resolve, reject) => {
    axios.post(`${API}/user/login`, body)
    .then(response => {
      if(DEVMODE) console.log('LogIn user success: ', response);
      resolve(response.data as IPostLogInAnswer);
    })
    .catch(error => {
      if(DEVMODE) console.log('LogIn user error: ', error);
      reject(error.response.data as IAPIError);
    })
  });
};

//PUT//

//DELETE//
