const path = require('path')
const { sendEmail } = require(path.resolve('src/modules/email/helpers/email.helper'))
const { createNewEmployee, getAllEmployee, completeEmployeeRegistration } = require('../helpers/employee.helper')

module.exports.newUser = async (req, res) => {
  const data = req.body

  try {
    const result = await createNewEmployee(data)
    if (result.status === 'EMPLOYEE_CREATED') {
      const mailOptions = {
        to: result.doc.email,
        subject: 'New Account'
      }
      const context = {
        title: 'FCUC-HRMS',
        header: 'New Account Registration',
        user: result.doc.name,
        employeeId: result.doc.employeeId,
        tempPassword: result.tempPassword
      }
      await sendEmail(mailOptions, context, 'new-employee-registration')
      return res.responder(201, result.status)
    }
  } catch (err) {
    return res.responder(500, err)
  }
}

module.exports.allUser = async (req, res) => {
  try {
    const docs = await getAllEmployee('name email employeeId employmentDate nickname position role status')
    return res.responder(200, docs)
  } catch (err) {
    return res.responder(500, err)
  }
}

module.exports.updateUser = async (req, res) => {
  const user = req.user
  const data = req.body

  if (user.usage !== 'NEW') {
    return res.responder(400, 'EMPLOYEE_REGISTERED')
  }

  try {
    const result = await completeEmployeeRegistration(user.id, data)
    return res.responder(201, result)
  } catch (err) {
    
  }  
}
