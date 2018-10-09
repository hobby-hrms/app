const mongoose = require('mongoose')
const { Schema } = mongoose

const leaveSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'employees', required: true },
  leave: { type: String, enum: ['annual', 'medical', 'replacement', 'emergency', 'special'] },
  classReplacements: { type: Array, default: [] },
  startDate: { type: Date },
  endDate: { type: Date },
  totalDays: { type: String },
  purpose: { type: String },
  noClassReason: { type: String },
  attachmentLink: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectReason: { type: String, default: '' },
  createdOn: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: Date.now() }
})

leaveSchema.pre('update', function() {
  this.update({}, { $set: { lastUpdated: Date.now() } })
})
mongoose.model('leaves', leaveSchema)
