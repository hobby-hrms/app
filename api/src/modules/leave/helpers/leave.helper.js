const path = require('path')
const mongoose = require('mongoose')
const Leave = mongoose.model('leaves')
const Employee = mongoose.model('employees')

const { aws } = require(path.resolve('src/config/default'))

module.exports.createNewLeave = async (id, data) => {
  try {
    const doc = await Leave.create({
      user: id,
      leave: data.leave,
      classReplacements: data.classReplacements,
      startDate: Date.parse(data.startDate),
      endDate: Date.parse(data.endDate),
      totalDays: data.totalDays,
      purpose: data.purpose,
      noClassReason: data.noClassReason,
      attachmentLink: data.attachmentLink
        ? `${aws.s3BaseUrl}/${aws.bucket}/${data.attachmentLink}`
        : null
    })
    const updateEmployee = await Employee.update(
      { _id: id },
      {
        $push: { leave: doc._id }
      }
    ).exec()
    return { status: 'LEAVE_CREATED', doc }
  } catch (err) {
    throw err
  }
}

module.exports.findLeaveById = async (id, role) => {
  try {
    if (role === 'employee') {
      return await Employee.findById(id)
        .populate('leave')
        .select('name employeeId')
        .exec()
    } else if (role === 'administrator' || role === 'superuser') {
      return await Leave.find({})
        .populate('user', 'name employeeId')
        .exec()
    }
  } catch (err) {
    throw err
  }
}

module.exports.updateLeaveStatus = async data => {
  try {
    await Leave.update(
      {
        _id: data.id.leaveId
      },
      {
        $set: {
          status: data.status,
          rejectReason: data.rejectReason ? data.rejectReason : ''
        }
      }
    )

    if (data.status === 'approved') {
      const leave = await Employee.findById(data.id.userId)
        .select('takenLeave remainingLeave')
        .exec()
      if (data.leave === 'annual') {
        await Employee.update(
          {
            _id: data.id.userId
          },
          {
            $set: {
              takenLeave: {
                annual:
                  (parseInt(leave.takenLeave.annual) + parseInt(data.totalDays)).toString() + 'd'
              },
              remainingLeave: {
                annual:
                  (parseInt(leave.remainingLeave.annual) - parseInt(data.totalDays)).toString() +
                  'd'
              }
            }
          }
        )
        return { status: 'LEAVE_UPDATED' }
      }
    }
  } catch (err) {
    throw err
  }
}
