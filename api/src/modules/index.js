// Module based file structure inspired by MEAN stack

module.exports.modules = app => {
  // Import your modules here
  require('./auth/routes/auth.route')(app)
  require('./user/routes/user.route')(app)
  require('./password/routes/password.route')(app)
  require('./connection/routes/connection.route')(app)
  require('./upload/routes/upload.route')(app)
  require('./attendance/routes/attendance.route')(app)
  require('./leave/routes/leave.route')(app)
  require('./claim/routes/claim.route')(app)

  // sending emails via API is only used for testing in development only
  // while in production, email functions are triggered internally
  if (process.env.NODE_ENV === 'development') {
    require('./email/routes/email.route')(app)
  }
}
