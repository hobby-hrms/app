const ConnnectionController = require('../controllers/connection.controller')

module.exports = app => {
  app.route('/connection/testing').get(ConnnectionController.testConnection)
}