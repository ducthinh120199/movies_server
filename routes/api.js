module.exports = function(app) {
  let registUser = require('../controllers/register');
  let userLogin = require('../controllers/login');

  app.route('/register')
    .post(registUser.registerUser);
  
  app.route('/login')
    .post(userLogin.loginUser);
};