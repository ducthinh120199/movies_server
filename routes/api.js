module.exports = function(app) {
  let user = require('../controllers/users/register');

  // todoList Routes
  app.route('/register')
    .post(user.registerUser);
};