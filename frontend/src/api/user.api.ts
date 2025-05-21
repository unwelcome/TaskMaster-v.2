import axios from "axios";
import { API, DEVMODE, type IAPIError, type IPostLogIn, type IPostLogInAnswer, type IPostSignUp, type IPostSignUpAnswer } from "@/helpers/constants";
import { GET_COOKIE } from "@/helpers/functions";


//GET//

//Get profile info
// export function API_GetProfileInfo(){
//   return new Promise((resolve, reject) => {
//     axios.get(`${API}/auth/profile`,  {
//       headers: {
//         Authorization: 'Bearer ' + GET_COOKIE('access_token'),
//       }
//      })
//     .then(response => {
//       if(DEVMODE) console.log('Get Profile info success: ', response);
//       resolve(response);
//     })
//     .catch(error => {
//       if(DEVMODE) console.log('Get Profile info error: ', error);
//       reject(error);
//     })
//   });
// };

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
