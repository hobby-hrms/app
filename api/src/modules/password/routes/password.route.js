const PasswordController = require('../controllers/password.controller')

module.exports = app => {
    app.route('/api/password/verify').post(PasswordController.getPasswordResetToken)
    app.route('/api/password/update').post(PasswordController.updatePassword)
}