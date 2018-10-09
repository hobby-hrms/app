const mongoose = require('mongoose')
const Admin = mongoose.model('admins')

module.exports.newUser = async (req, res) => {
  return res.json({
    message: 'You should see this if authenticated'
  })
}

module.exports.allUser = (req, res) => {
  return res.json({
    message: req.route
  })
}

module.exports.updateUser = (req, res) => {
  const adminId = req.params.adminId
  const data = req.body
  return Admin.findByIdAndUpdate(
    adminId,
    {
      password: data.password,
      lastUpdated: Date.now()
    },
    (err, doc) => {
      if (!err) {
        return res.json({
          message: doc
        })
      }
    }
  )
}
