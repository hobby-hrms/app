const path = require('path')
const { frontendUrl } = require(path.resolve('./src/config/default'))
const { validateUserPassword, checkForExistingToken } = require(path.resolve(
  './src/modules/password/helpers/password.helper'
))
const { getOneAdminByEmployeeId, getOneAdminByEmail, signUpAdmin } = require(path.resolve(
  './src/modules/user/helpers/admin.helper'
))
const { getOneEmployeeByEmployeeId, getOneEmployeeByEmail } = require(path.resolve(
  './src/modules/user/helpers/employee.helper'
))
const { sendEmail } = require(path.resolve('./src/modules/email/helpers/email.helper'))
const { generateUserToken, validateUserToken, generatePayload } = require('../helpers/auth.helper')

module.exports.login = async (req, res) => {
  const data = req.body
  let user = null
  req.body = {}

  try {
    if (data.type === 'administrator') {
      user = await getOneAdminByEmployeeId(data.employeeId)
    } else if (data.type === 'employee') {
      user = await getOneEmployeeByEmployeeId(data.employeeId)
    }
    if (user.status === 'USER_FOUND') {
      const isPasswordMatched = await validateUserPassword(data.password, user.document.password)
      if (isPasswordMatched) {
        let payload, token
        if (user.document.status === 'new') {
          payload = generatePayload(user.document, 'NEW')
          token = generateUserToken(payload)
          return res.responder(200, { token, payload })
        } 
        payload = generatePayload(user.document, 'LOGIN')
        token = generateUserToken(payload)
        return res.responder(200, { token, payload })
      } else {
        return res.responder(401, 'INVALID_PASSWORD')
      }
    } else if (user.status === 'USER_NOT_FOUND') {
      return res.responder(404, user.status)
    }
  } catch (err) {
    return res.responder(500, err)
  }
}

module.exports.verify = async (req, res) => {
  const data = req.body
  req.body = {}
  try {
    const result = validateUserToken(data.token)
    if (result.usage === 'PASSWORD_RESET') {
      const isBlacklisted = await checkForExistingToken(data.token)
      if (!isBlacklisted) return res.responder(200, result)
    }
    return res.responder(200, result)
  } catch (error) {
    if (error.message === 'TOKEN_EXPIRED' || error.message === 'TOKEN_USED') {
      return res.responder(401, error.message)
    } else if (error.message === 'TOKEN_INVALID') {
      return res.responder(400, error.message)
    } else {
      return res.responder(500, error)
    }
  }
}

module.exports.resetPassword = async (req, res) => {
  const data = req.body
  let user = null
  req.body = {}

  try {
    if (data.type === 'administrator') {
      user = await getOneAdminByEmail(data.email)
    } else if (data.type === 'employee') {
      user = await getOneEmployeeByEmail(data.email)
    }
    if (user.status === 'USER_FOUND') {
      const token = generateUserToken(generatePayload(user.document, 'PASSWORD_RESET'))
      const mailOptions = {
        to: user.document.email,
        subject: 'Password Reset'
      }
      const context = {
        title: 'FCUC-HRMS',
        header: 'Password Reset Request',
        user: user.document.nickname,
        link: `${frontendUrl}/new-password?token=${token}`
      }
      const email = await sendEmail(mailOptions, context, 'password-reset')
      if (email.status === 'EMAIL_SENT') {
        return res.responder(200, email.status)
      }
    } else if (user.status === 'USER_NOT_FOUND') {
      return res.responder(404, user.status)
    }
  } catch (err) {
    return res.responder(500, err)
  }
}

// Sign up admins is only available during development,
// While in production, only existing admins can add other admins through /api/admin/new
module.exports.signup = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.responder(403, 'FEATURE_DISABLED_IN_PRODUCTION')
  }

  const data = req.body
  req.body = {}

  if (!data.email || !data.password) {
    return res.responder(400, 'MISSING_EMAIL_OR_PASSWORD')
  }
  return signUpAdmin(data)
    .then(result => {
      return res.responder(201, result)
    })
    .catch(err => {
      return res.responder(500, err)
    })
}
