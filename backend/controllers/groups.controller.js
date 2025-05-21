const api = require('../db/api.db');
const passwordFunctions = require('../helpers/passwordFunctions');

//ROUTES

async function getAllGroups(req, res){
  try{
    const dbres = await api.groups.getAllGroups();
    res.status(200).json(dbres);
  }catch(e){
    res.status(400).json({message: 'Get all groups error'});
  }
}

async function getUserGroups(req, res){
  try{
    const dbres = await api.groups.getUserGroupsById(req.user_id);
    res.status(200).json(dbres);
  }catch(e){
    res.status(400).json({message: 'Get user groups error'});
  }
}

async function createGroup(req, res){
  try{
    const { title, password } = req.body;
    const {salt, hash} = passwordFunctions.hashPassword(password);
  
    const dbres = await api.groups.createGroup(title, hash, salt, req.user_id);
    res.status(201).json({group_id: dbres.group_id});
  }catch(e){
    res.status(400).json({message: 'Create group error'});
  }
}

//EXPORT

module.exports = {
  getAllGroups,
  getUserGroups,
  createGroup,
}