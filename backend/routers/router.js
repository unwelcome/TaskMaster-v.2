const express = require('express');
const router = express.Router();
const api = require('../controllers/api.controller');

const redis = require('../redis/database');

//Check Authentication
router.use('/auth', api.authController.checkAuth);

//health routes
router.get('/health', (req,res) => res.status(200).send('health'));
router.get('/auth/health', async (req, res) => res.status(200).json({user_id: req.user_id, health: 'health'}));

//Users routes
router.get('/users', api.usersController.getAllUsers);
router.get('/auth/user', api.usersController.getUserInfo);
router.post('/user/signup', api.usersController.signupUser);
router.post('/user/login', api.usersController.loginUser);
router.delete('/user/:id', api.usersController.deleteUser);

//Groups routes
router.get('/groups', api.groupsController.getAllGroups);
router.get('/auth/groups', api.groupsController.getUserGroups);
router.get('/auth/group/:id', api.groupsController.getGroupInfo);
router.post('/auth/group/create', api.groupsController.createGroup);
router.put('/auth/group/:id', api.groupsController.updateGroupSettings);
router.delete('/auth/group/:id', api.groupsController.deleteGroup);

//Test redis request
router.get('/redis', async(req, res) => {
  redis.get('my-key').then((result) => {
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(400).send('No redis data');
  });
});
router.post('/redis', async(req, res) => {
  try{
    await redis.set('my-key', req.body.value);
    res.status(201).send('Saved data to redis');
  }catch(e){
    res.status(400).send('Smth went wrong while set data in redis');
  }
});

module.exports = router;