const api = require('../db/api.db');
const passwordFunctions = require('../helpers/passwordFunctions');
const { normaliseID } = require('../helpers/normalisedParams');

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

async function getGroupInfo(req, res){
  try{
    const normalID = normaliseID(req.params);
    if(normalID.error !== null) return res.status(406).json({message: 'Wrong group id'});

    const userRole = await api.groups.getUserRoleInGroup(req.user_id, normalID.value);
    if(userRole === undefined) return res.status(403).json({message: 'Not enough right to watch group'});

    const dbres = await api.groups.getGroupInfo(normalID.value);
    res.status(200).json(dbres);
  }catch(e){
    res.status(404).json({message: 'Get group info error'});
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

async function updateGroupSettings(req, res){
  try{
    const { title, score_limit, topic_limit, group_status, chat_status, enable_senior } = req.body;

    const normalID = normaliseID(req.params);
    if(normalID.error !== null) return res.status(406).json({message: 'Wrong group id'});

    const userRole = await api.groups.getUserRoleInGroup(req.user_id, normalID.value);
    if(userRole === undefined || userRole.role !== 'teacher') return res.status(403).json({message: 'Not enough right to update group settings'});

    const dbres = await api.groups.updateGroupSettings(normalID.value, title, score_limit, topic_limit, group_status, chat_status, enable_senior);
    
    if(dbres) res.status(202).json({id: normalID.value});
    else res.status(304).json({id: normalID.value});
  }catch(e){
    res.status(400).json({message: 'Update group settings error'});
  }
}

async function deleteGroup(req, res){
  try{
    const normalID = normaliseID(req.params);
    if(normalID.error !== null) return res.status(406).json({message: 'Wrong group id'});

    const userRole = await api.groups.getUserRoleInGroup(req.user_id, normalID.value);
    if(userRole === undefined || userRole.role !== 'teacher') return res.status(403).json({message: 'Not enough right to delete group'});
  
    const dbres = await api.groups.deleteGroup(normalID.value);

    if(dbres) res.status(200).json({id: normalID.value});
    else res.status(400).json({message: 'Can\'t delete group'});
  }catch(e){
    res.status(400).json({message: 'Delete group error'});
  }
}

//EXPORT

module.exports = {
  getAllGroups,
  getUserGroups,
  getGroupInfo,
  createGroup,
  updateGroupSettings,
  deleteGroup,
}