const jwt = require('../helpers/jwtFunctions');

async function checkAuth(req, res, next) {
  try{
    const authHeader = req.headers['authorization'];
    if(authHeader === undefined) return res.status(401).json({message: 'Missing auth token'});
  
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET || 'secret_key_3000';
  
    jwt.verify(token, secretKey, (err, payload) => {
      if(err){
        switch(err.name){
          case 'TokenExpiredError': return res.status(401).json({ message: 'Token expired' });
          default: res.status(401).json({ message: 'Wrong auth token' });
        }
      }
      req.user_id = payload.user_id;      
      next();
    });
  }catch(e){
    console.log('Auth error: ', e);
    res.status(401).json({message: 'Auth error'});
  }
}

module.exports = {
  checkAuth,
}