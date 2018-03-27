module.exports = function(app) {
  var users = require('../controllers/user.controller.js');

  // Create a new user
  app.post('/api/users/register', users.create);

}
