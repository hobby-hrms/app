const mongoose = require('mongoose')
const Admin = mongoose.model('admins')
const Employee = mongoose.model('employees')

const { hashUserPassword } = require('../../password/helpers/password.helper')

module.exports.getOneAdminByEmail = async email => {
  try {
    const result = await Admin.findOne({ email }).exec()
    if (result) {
      return { status: 'USER_FOUND', document: result }
    }
    return { status: 'USER_NOT_FOUND', document: result }
  } catch (err) {
    throw err
  }
}

module.exports.getOneAdminByEmployeeId = async employeeId => {
  try {
    const result = await Admin.findOne({ employeeId }).exec()
    if (result) {
      return { status: 'USER_FOUND', document: result }
    }
    return { status: 'USER_NOT_FOUND', document: result }
  } catch (err) {
    throw err
  }
}

module.exports.getOneAdminById = async id => {
  try {
    return await Admin.findById(id).exec()
  } catch (err) {
    throw err
  }
}

module.exports.updateOneAdminPassword = async (id, password) => {
  try {
    const encrypted = await hashUserPassword(password)
    const result = await Admin.update({ _id: id }, { $set: { password: encrypted } }).exec()
    if (result.ok === 1) {
      return { status: 'UPDATE_SUCCESS' }
    }
  } catch (err) {
    throw err
  }
}

// This function is only available in development mode
const saveAdminToDatabase = (data, encrypted) => {
  return new Promise((resolve, reject) => {
    Admin.create({
      email: data.email,
      password: encrypted,
      name: data.name,
      nickname: data.nickname,
      employeeId: data.employeeId,
      employmentDate: Date.parse(data.employmentDate),
      position: data.position,
      status: data.status,
      role: data.role
    }).then(
      result => {
        return resolve(result)
      },
      err => {
        return reject(err)
      }
    )
  })
}

// this will be disabled in production
module.exports.signUpAdmin = data => {
  return hashUserPassword(data.password).then(encrypted => {
    return saveAdminToDatabase(data, encrypted)
  })
}


