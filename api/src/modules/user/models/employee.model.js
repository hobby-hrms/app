const path = require('path')
const { aws } = require(path.resolve('src/config/default'))

const mongoose = require('mongoose')
const { Schema } = mongoose

const employeeSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String },
  avatar: { type: String, default: `${aws.s3BaseUrl}/${aws.bucket}/public/default_avatar.png` },
  employeeId: { type: String, unique: true, required: true },
  employmentDate: { type: Date, required: true },
  position: { type: String },
  role: { type: String, enum: ['employee'], default: 'employee' },
  createdOn: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: Date.now() },
  status: { type: String, enum: ['new', 'active', 'suspended', 'inactive'], default: 'new' },
  carryForward: { type: String, default: '0d' },
  entitledLeave: {
    medical: { type: String, default: '14d' },
    annual: { type: String, default: '12d' },
    replacement: { type: String, default: '0d' },
    special: {
      unpaid: { type: String, default: '0d' },
      staffDevelopment: { type: String, default: '0d' },
      training: { type: String, default: '0d' },
      maternity: { type: String, default: '0d' }
    }
  },
  takenLeave: {
    medical: { type: String, default: '14d' },
    annual: { type: String, default: '12d' },
    emergency: { type: String, default: '12d' },
    replacement: { type: String, default: '0d' },
    special: {
      unpaid: { type: String, default: '0d' },
      staffDevelopment: { type: String, default: '0d' },
      training: { type: String, default: '0d' },
      maternity: { type: String, default: '0d' }
    }
  },
  remainingLeave: {
    medical: { type: String, default: '14d' },
    annual: { type: String, default: '12d' },
    replacement: { type: String, default: '0d' },
    special: {
      unpaid: { type: String, default: '0d' },
      staffDevelopment: { type: String, default: '0d' },
      training: { type: String, default: '0d' },
      maternity: { type: String, default: '0d' }
    }
  },
  leave: [{ type: Schema.Types.ObjectId, ref: 'leaves' }],
  claim: [{ type: Schema.Types.ObjectId, ref: 'claims' }],
  attendance: [{ type: Schema.Types.ObjectId, ref: 'attendances' }]
})

employeeSchema.pre('update', function() {
  this.update({}, { $set: { lastUpdated: Date.now() } })
})

mongoose.model('employees', employeeSchema)
