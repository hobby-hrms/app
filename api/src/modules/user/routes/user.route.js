const EmployeeController = require('../controllers/employee.controller')
const AdminController = require('../controllers/admin.controller')

module.exports = app => {
    app.route('/api/user/employee').get(EmployeeController.allUser)
    app.route('/api/user/employee').post(EmployeeController.newUser)
    app.route('/api/user/employee').put(EmployeeController.updateUser)
}
