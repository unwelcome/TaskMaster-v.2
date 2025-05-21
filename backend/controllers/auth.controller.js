const jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
  try{
    const authHeader = req.headers['authorization'];
    if(authHeader === undefined) return res.status(401).json({message: 'Missing auth token'});
  
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET || 'secret_key_3000';
  
    jwt.verify(token, secretKey, (err, payload) => {
      if(err){
        return res.status(403).json({message: 'Wrong auth token'});
      }
  
      console.log('payload: ', payload);
      req.user_id = payload.user_id;
      
      next();
    });
  }catch(e){
    console.log('Auth error: ', e);
    res.status(400).json('Auth error');
  }
}

module.exports = {
  checkAuth,
}