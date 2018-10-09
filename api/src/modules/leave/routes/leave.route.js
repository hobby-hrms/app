const LeaveController = require('../controllers/leave.controller')

module.exports = app => {
  app.route('/api/leave').get(LeaveController.checkRemainingLeave)
  app.route('/api/leave/apply').get(LeaveController.getAllAppliedLeaves)
  // app.route('/api/leave/validate').post(LeaveController.validateLeave)
  app.route('/api/leave').post(LeaveController.newLeaveApplication)
}