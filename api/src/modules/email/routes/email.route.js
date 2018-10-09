const EmailController = require('../controllers/email.controller')

module.exports = app => {
  app.route('/api/email').post(EmailController.send)
}
