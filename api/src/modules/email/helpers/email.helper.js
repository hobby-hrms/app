const path = require('path')
const nodemailer = require('nodemailer')

const { mailgun } = require(path.resolve('./src/config/default'))
const Email = require('../helpers/template.helper')

let transporter = nodemailer.createTransport({
  host: mailgun.host,
  port: 465,
  secure: true,
  auth: {
    user: mailgun.user,
    pass: mailgun.password
  }
})

module.exports.sendEmail = async (mailOptions, context, template) => {
  try {
    const emailObject = new Email(context, template)
    const htmlContent = await emailObject.compile()
    const sendEmail = await transporter.sendMail({
      to: mailOptions.to,
      from: mailgun.sender,
      subject: mailOptions.subject,
      html: htmlContent
    })
    if (sendEmail.response.startsWith('250')) {
      return { status: 'EMAIL_SENT' }
    }
  } catch (err) {
    throw err
  }
}
