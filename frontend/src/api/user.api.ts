import axios from "axios";
import { API, DEVMODE } from "@/helpers/constants";
import { GET_COOKIE } from "@/helpers/functions";


//GET//
export function API_GetProfileInfo(){
  return new Promise((resolve, reject) => {
    axios.get(`${API}/auth/profile`,  {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Get Profile info success: ', response);
      resolve(response);
    })
    .catch(error => {
      if(DEVMODE) console.log('Get Profile info error: ', error);
      reject(error);
    })
  });
};

//POST//

//PUT//

//DELETE//
