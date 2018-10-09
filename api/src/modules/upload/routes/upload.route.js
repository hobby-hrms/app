const UploadController = require('../controllers/upload.controller')

module.exports = app => {
  app.route('/api/upload?:type').get(UploadController.requestPresignedUrl)
}