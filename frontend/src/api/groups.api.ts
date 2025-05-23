import axios from "axios";
import { API, DEVMODE, 
  type IAPIError, 
  type IDeleteGroupAnswer, 
  type IGetGroupInfoAnswer, 
  type IGetUserGroupsAnswer, 
  type IPostGroupCreate, type IPostGroupCreateAnswer, 
  type IPutGroupSettings, type IPutGroupSettingsAnswer 
} from "@/helpers/constants";
import { GET_COOKIE } from "@/helpers/functions";

//GET

// Get user groups
export function API_GetUserGroups(): Promise<Array<IGetUserGroupsAnswer> | any>{
  return new Promise((resolve, reject) => {
    axios.get(`${API}/auth/groups`,  {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Get user groups success: ', response);
      resolve(response.data as Array<IGetUserGroupsAnswer>);
    })
    .catch(error => {
      if(DEVMODE) console.log('Get user groups error: ', error);
      reject(error);
    })
  });
};

// Get group info
export function API_GetGroupInfo(groupID: number): Promise<IGetGroupInfoAnswer | any>{
  return new Promise((resolve, reject) => {
    axios.get(`${API}/auth/group/${groupID}`,  {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Get group info success: ', response);
      resolve(response.data as IGetGroupInfoAnswer);
    })
    .catch(error => {
      if(DEVMODE) console.log('Get group info error: ', error);
      reject(error);
    })
  });
};

//POST

// Create group
export function API_PostGroupCreate(data: IPostGroupCreate): Promise<IPostGroupCreateAnswer | any>{
  return new Promise((resolve, reject) => {
    axios.post(`${API}/auth/group/create`, data, {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Create group success: ', response);
      resolve(response.data as IPostGroupCreateAnswer);
    })
    .catch(error => {
      if(DEVMODE) console.log('Create group error: ', error);
      reject(error);
    })
  });
};

//PUT

// Update group settings
export function API_PutGroupSettings(groupID: number, data: IPutGroupSettings): Promise<IPutGroupSettingsAnswer | any>{
  return new Promise((resolve, reject) => {
    axios.put(`${API}/auth/group/${groupID}`, data, {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Update group settings success: ', response);
      resolve(response.data as IPutGroupSettingsAnswer);
    })
    .catch(error => {
      if(DEVMODE) console.log('Update group settings error: ', error);
      reject(error);
    })
  });
};

//DELETE

// Delete group
export function API_DeleteGroup(groupID: number): Promise<IDeleteGroupAnswer | any>{
  return new Promise((resolve, reject) => {
    axios.delete(`${API}/auth/group/${groupID}`, {
      headers: {
        Authorization: 'Bearer ' + GET_COOKIE('access_token'),
      }
     })
    .then(response => {
      if(DEVMODE) console.log('Delete group success: ', response);
      resolve(response.data as IDeleteGroupAnswer);
    })
    .catch(error => {
      if(DEVMODE) console.log('Delete group error: ', error);
      reject(error);
    })
  });
};