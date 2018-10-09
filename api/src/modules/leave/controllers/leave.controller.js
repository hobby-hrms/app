const path = require('path')
const { getOneEmployeeById, getAllEmployee } = require(path.resolve(
  './src/modules/user/helpers/employee.helper'
))

const { createNewLeave, findLeaveById, updateLeaveStatus } = require('../helpers/leave.helper')

module.exports.checkRemainingLeave = async (req, res) => {
  const user = req.user
  if (user.accessLevel === 1) {
    try {
      const result = await getOneEmployeeById(user.id, 'entitledLeave takenLeave remainingLeave')
      return res.responder(200, result)
    } catch (err) {
      return res.responder(500, err)
    }
  } else if (user.accessLevel >= 2) {
    try {
      const result = await getAllEmployee('entitledLeave takenLeave remainingLeave')
      return res.responder(200, result)
    } catch (err) {
      return res.responder(500, err)
    }
  }
}

module.exports.getAllAppliedLeaves = async (req, res) => {
  const user = req.user
  try {
    const result = await findLeaveById(user.id, user.role)
    return res.responder(200, result)
  } catch (err) {
    return res.responder(500, err)
  }
}

module.exports.newLeaveApplication = async (req, res) => {
  const user = req.user
  const data = req.body
  try {
    const result = await createNewLeave(user.id, data)
    if (result.status === 'LEAVE_CREATED') {
      return res.responder(201, result.status)
    }
  } catch (err) {
    return res.responder(500, err)
  }
}

// module.exports.validateLeave = async (req, res) => {
//   const user = req.user
//   const data = req.body

//   if (user.accessLevel < 2) {
//     return res.responder(401, 'INSUFFICIENT_PRIVILEGES')
//   }

//   const result = await updateLeaveStatus(data)
//   if (result.status === 'LEAVE_UPDATED') {
//     return res.responder(200, result.status)
//   }
// }
