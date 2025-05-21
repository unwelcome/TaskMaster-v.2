const express = require('express');
const router = express.Router();
const api = require('../controllers/api.controller');

//Check Authentication
router.use('/auth', api.authController.checkAuth);

//health routes
router.get('/health', (req,res) => res.status(200).send('health'));
router.get('/auth/health', async (req, res) => res.status(200).json({user_id: req.user_id, health: 'health'}));

//User routes
router.get('/auth/users', api.userController.getAllUsers);
router.get('/auth/user', api.userController.getUserInfo);
router.post('/user/signup', api.userController.signupUser);
router.post('/user/login', api.userController.loginUser);
router.delete('/user/:id', api.userController.deleteUser);


module.exports = router;