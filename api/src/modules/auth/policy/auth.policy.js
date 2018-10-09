const { validateUserToken } = require('../helpers/auth.helper')

const determineAccessLevel = role => {
  switch (role) {
    case 'employee':
      return 1
      break
    case 'administrator':
      return 2
      break
    case 'superuser':
      return 3
      break
  }
}

module.exports.verifyUserToken = (req, res, next) => {
  const token = req.get('Authorization')
  try {
    const user = validateUserToken(token)
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      nickname: user.nickname,
      role: user.role,
      employeeId: user.employeeId,
      position: user.position,
      accessLevel: determineAccessLevel(user.role),
      usage: user.usage
    }
    next()
  } catch (err) {
    if (err.message === 'TOKEN_EXPIRED') {
      return res.responder(401, err.message)
    } else if (err.message === 'TOKEN_INVALID') {
      return res.responder(400, err.message)
    } else {
      return res.responder(500, err)
    }
  }
}

module.exports.isAdministrator = (req, res, next) => {
  const accessLevel = req.user.accessLevel
  if (accessLevel <= 1) {
    return res.responder(403, 'INSUFFICIENT_PRIVILEGES')
  }
  next()
}

module.exports.isSuperuser = (req, res, next) => {
  const accessLevel = req.user.accessLevel
  if (accessLevel <= 2) {
    return res.responder(403, 'INSUFFICIENT_PRIVILEGES')
  }
  next()
}
