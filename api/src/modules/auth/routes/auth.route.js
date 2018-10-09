const AuthController = require('../controllers/auth.controller')
const Policy = require('../policy/auth.policy')

module.exports = app => {
  app.route('/api/*').all(Policy.verifyUserToken)

  app.route('/auth/login').post(AuthController.login)
  app.route('/auth/verify').post(AuthController.verify)
  app.route('/auth/password/reset').post(AuthController.resetPassword)

  // Development only api route
  app.route('/auth/signup').post(AuthController.signup)
  
}
