const usersHandlers = require('./handlers/users');
const groupsHandlers = require('./handlers/groups');

module.exports = {
  users: usersHandlers,
  groups: groupsHandlers,
};