const path = require('path')
const mongoose = require('mongoose')
const Employee = mongoose.model('employees')

const { hashUserPassword } = require(path.resolve('./src/modules/password/helpers/password.helper'))

module.exports.getOneEmployeeByEmail = async email => {
  try {
    const result = await Employee.findOne({ email }).exec()
    if (result) {
      return { status: 'USER_FOUND', document: result }
    }
    return { status: 'USER_NOT_FOUND', document: result }
  } catch (err) {
    throw err
  }
}

module.exports.getOneEmployeeByEmployeeId = async employeeId => {
  try {
    const result = await Employee.findOne({ employeeId }).exec()
    if (result) {
      return { status: 'USER_FOUND', document: result }
    }
    return { status: 'USER_NOT_FOUND', document: result }
  } catch (err) {
    throw err
  }
}

module.exports.getOneEmployeeById = async (id, field) => {
  try {
    return await Employee.findById(id)
      .select(field)
      .exec()
  } catch (err) {
    throw err
  }
}

module.exports.createNewEmployee = async data => {
  try {
    const tempPassword = Date.now().toString()
    const encrypted = await hashUserPassword(tempPassword)
    const doc = await Employee.create({
      email: data.email,
      password: encrypted,
      name: data.name,
      employeeId: data.employeeId,
      employmentDate: Date.parse(data.employmentDate),
      carryForward: data.carryForward,
      entitledLeave: {
        medical: data.entitledLeave.medical,
        annual: data.entitledLeave.annual,
        replacement: data.entitledLeave.replacement
      },
      takenLeave: {
        medical: data.takenLeave.medical,
        annual: data.takenLeave.annual,
        emergency: data.takenLeave.emergency,
        replacement: data.takenLeave.replacement
      },
      remainingLeave: {
        medical: data.remainingLeave.medical,
        annual: data.remainingLeave.annual,
        replacement: data.remainingLeave.replacement
      }

    })
    return { status: 'EMPLOYEE_CREATED', doc, tempPassword }
  } catch (err) {
    throw err
  }
}

module.exports.getAllEmployee = async field => {
  try {
    return await Employee.find({})
      .select(field)
      .exec()
  } catch (err) {
    throw err
  }
}

module.exports.completeEmployeeRegistration = async (id, data) => {
  try {
    const encrypted = await hashUserPassword(data.password)
    const result = await Employee.update(
      { _id: id },
      {
        $set: {
          password: encrypted,
          nickname: data.nickname,
          position: data.position,
          status: 'active'
        }
      }
    ).exec()
    if (result.ok === 1) {
      return { status: 'REGISTRATION_SUCCESS' }
    }
  } catch (err) {
    throw err
  }
}

// This function is only used in password module
module.exports.updateOneEmployeePassword = async (id, password) => {
  try {
    const encrypted = await hashUserPassword(password)
    const result = await Employee.update({ _id: id }, { $set: { password: encrypted } }).exec()
    if (result.ok === 1) {
      return { status: 'UPDATE_SUCCESS' }
    }
  } catch (err) {
    throw err
  }
}
