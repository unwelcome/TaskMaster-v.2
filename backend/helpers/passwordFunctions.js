const crypto = require('node:crypto');

function hashPassword(password, _salt=null){
  const salt = (_salt === null) ? crypto.randomBytes(128).toString('base64') : _salt;
  const iterations = 10;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 128, 'sha512').toString('base64');

  return {salt: salt, hash: hash};
}

function checkPassword(password, passwordHash, passwordSalt){
  const {salt, hash} = hashPassword(password, passwordSalt);

  return hash === passwordHash;
}

module.exports = {
  hashPassword,
  checkPassword,
}