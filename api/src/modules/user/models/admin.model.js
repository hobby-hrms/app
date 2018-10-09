const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  employeeId: {
    type: String,
    unique: true,
    required: true
  },
  employmentDate: {
    type: Date,
    required: true
  },
  position: {
    type: String
  },
  role: {
    type: String,
    enum: ['superuser', 'administrator'],
    default: 'administrator'
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  lastUpdated: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['new', 'active', 'suspended', 'inactive'],
    default: 'new'
  }
})

adminSchema.pre('update', function() {
  this.update({}, { $set: { lastUpdated: Date.now() } })
})

mongoose.model('admins', adminSchema)
