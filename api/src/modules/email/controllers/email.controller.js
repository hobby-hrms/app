const { sendEmail } = require('../helpers/email.helper')

module.exports.send = (req, res) => {
  // Only for testing in development only
  const mailOptions = {
    to: req.body.email,
    subject: 'Password Reset'
  }

  const context = {
    title: 'FCUC-HRMS',
    header: 'Password Reset Request',
    user: 'Howard Chang',
    link: 'www.google.com'
  }
  return sendEmail(mailOptions, context, 'password-reset-notify').then(result => {
    return res.responder(200, result)
  }).catch(err => {
    return res.responder(500, result)
  })
}
