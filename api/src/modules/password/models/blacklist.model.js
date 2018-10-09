const mongoose = require('mongoose')
const {Schema} = mongoose

const blacklistSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600
  }
})

mongoose.model('blacklists', blacklistSchema)