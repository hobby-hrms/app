const path = require('path')
const { generateUserToken, generatePayload } = require(path.resolve(
  './src/modules/auth/helpers/auth.helper'
))
const { updateOneAdminPassword, getOneAdminById } = require(path.resolve(
  './src/modules/user/helpers/admin.helper'
))
const { updateOneEmployeePassword, getOneEmployeeById } = require(path.resolve(
  './src/modules/user/helpers/employee.helper'
))
const { sendEmail } = require(path.resolve('./src/modules/email/helpers/email.helper'))

const {
  blacklistToken,
  checkForExistingToken,
  validateUserPassword
} = require('../helpers/password.helper')

module.exports.getPasswordResetToken = async (req, res) => {
  const payload = req.user
  const data = req.body
  req.body = {}

  let user = null

  if (!data.password) {
    return res.responder(400, 'MISSING_PASSWORD')
  }

  try {
    if (payload.role === 'administrator' || payload.role === 'superuser') {
      user = await getOneAdminById(payload.id)
    } else {
      user = await getOneEmployeeById(payload.id)
    }
    const isPasswordMatched = await validateUserPassword(data.password, user.password)
    if (isPasswordMatched) {
      const token = generateUserToken(generatePayload(payload, 'PASSWORD_RESET'))
      return res.responder(200, { token })
    } else {
      return res.responder(401, 'INVALID_PASSWORD')
    }
  } catch (err) {
    return res.responder(500, err)
  }
}

module.exports.updatePassword = async (req, res) => {
  const token = req.get('Authorization')
  const user = req.user
  const data = req.body
  let updatePassword = null
  if (user.usage !== 'PASSWORD_RESET') {
    return res.responder(401, 'INVALID_PASSWORD_RESET_TOKEN')
  }

  try {
    if (user.role === 'administrator' || user.role === 'superuser') {
      updatePassword = await updateOneAdminPassword(user.id, data.password)
    } else {
      updatePassword = await updateOneEmployeePassword(user.id, data.password)
    }

    if (updatePassword.status === 'UPDATE_SUCCESS') {
      const mailOptions = {
        to: user.email,
        subject: 'Password Updated'
      }
      const context = {
        title: 'FCUC-HRMS',
        header: 'Password Updated',
        user: user.nickname
      }
      await sendEmail(mailOptions, context, 'password-reset-notify')
      await blacklistToken(token)
      return res.responder(200, updatePassword.status)
    }
  } catch (err) {
    return res.responder(500, err)
  }
}
