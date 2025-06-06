const api = require('../db/api.db');
const jwt = require('../helpers/jwtFunctions');
const passwordFunctions = require('../helpers/passwordFunctions');

//ROUTES

async function getAllUsers(req, res){
  try{
    const users = await api.users.getAllUsers();
    res.status(200).json(users);
  }catch(e){
    res.status(500).json({message: 'Server error'});
  }
}

async function getUserInfo(req, res){
  try{
    const dbres = await api.users.getUserById(req.user_id);

    res.status(200).json({
      id: dbres.id,
      first_name: dbres.first_name,
      last_name: dbres.last_name,
      middle_name: dbres.middle_name,
      avatar_url: dbres.avatar_url,
    });
  }catch(e){
    res.send(400).json({message: 'Get user info error'});
  }
}

async function signupUser(req, res){
  try{
    const {email, password, last_name, first_name, middle_name, avatar_url} = req.body;
    const {salt, hash} = passwordFunctions.hashPassword(password);

    const dbres = await api.users.createUser(
      hash, 
      salt, 
      email, 
      last_name, 
      first_name, 
      middle_name === '' ? null : middle_name, 
      avatar_url === '' ? null : avatar_url);

    res.status(201).json({id: dbres.id});
  }catch(e){
    //Same email error
    if(e.constraint === 'users_email_key') res.status(400).json({message: 'Email is already exists'});
    //Other errors
    else res.status(400).json({message: 'Create user error'});
  }
}

async function loginUser(req, res){
  try{
    const { email, password } = req.body;
  
    const dbres = await api.users.getUserHashAndSalt(email);
  
    if(passwordFunctions.checkPassword(password, dbres.password_hash, dbres.password_salt)){
      const payload = {
        user_id: dbres.id
      };
      const secretKey = process.env.JWT_SECRET || 'secret_key_3000';
      const options = {
        expiresIn: 60 * 60 * 24 * 4,
        algorithm: 'HS256',   // Алгоритм подписи
      };
      
      // Создаем токен
      new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, options, (err, token) => {
          if (err) {
            console.error('Ошибка при создании токена:', err);
            return reject(err);
          }
          resolve(token);
        });
      }).then((token) => {
        res.status(200).json({
          id: dbres.id,
          access_token: token
        });
      })
      .catch(err => {
        res.status(400).json({message: 'Create auth token error'});
      })
    }else{
      res.status(400).json({message: 'Wrong password'});
    }
  }catch(e){
    console.log(e);
    res.status(400).json({message: 'User not found'});
  }
}

async function deleteUser(req, res){
  try{    
    const { id } = req.params;

    const dbres = api.users.deleteUser(id);
    res.status(205).json({id: id});
  }catch(e){
    res.send(400).json({message: 'Delete user error'});
  }
}

//EXPORT

module.exports = {
  getAllUsers,
  getUserInfo,
  signupUser,
  loginUser,
  deleteUser,
}