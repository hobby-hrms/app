const path = require('path')
const { jwtOptions, jwtSecretOrKey } = require(path.resolve('./src/config/default'))

const jwt = require('jsonwebtoken')

const AUTHENTICATED = 'AUTHENTICATED'
const JWT_VERIFIED = 'JWT_VERIFIED'
const JWT_ERROR = 'JWT_ERROR'

const signJWT = payload => {
  if (payload.usage === 'PASSWORD_RESET') {
    jwtOptions.expiresIn = '1h'
  }
  try {
    return jwt.sign(payload, jwtSecretOrKey, jwtOptions)
  } catch (err) {
    throw err
  }
}

const verifyJWT = token => {
  try {
    return jwt.verify(token, jwtSecretOrKey, jwtOptions)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error('TOKEN_EXPIRED')
    } else if (err.name === 'JsonWebTokenError') {
      throw new Error('TOKEN_INVALID')
    } else {
      throw err
    }
  }
}

module.exports.generatePayload = (user, usage) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    nickname: user.nickname,
    role: user.role,
    position: user.position,
    employeeId: user.employeeId,
    avatar: user.avatar,
    usage
  }
}

module.exports.generateUserToken = payload => {
  return signJWT(payload)
}

module.exports.validateUserToken = token => {
  return verifyJWT(token)
}
