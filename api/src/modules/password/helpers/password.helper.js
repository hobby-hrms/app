const path = require('path')
const mongoose = require('mongoose')

const { bcryptOptions } = require(path.resolve('./src/config/default'))

const bcrypt = require('bcrypt')
const saltRounds = bcryptOptions.saltRounds

const INVALID_PASSWORD = 'INVALID_PASSWORD'
const PASSWORD_MATCH = 'PASSWORD_MATCH'
const BCRYPT_ERROR = 'BCRYPT_ERROR'

const Blacklist = mongoose.model('blacklists')

module.exports.hashUserPassword = async password => {
  try {
    return await bcrypt.hash(password, parseInt(saltRounds))
  } catch (err) {
    throw err
  }
}

module.exports.validateUserPassword = async (password, encrypted) => {
  try {
    return await bcrypt.compare(password, encrypted)
  } catch (err) {
    throw err
  }
}

module.exports.blacklistToken = async token => {
  try {
    await Blacklist.create({ token })
  } catch (err) {
    throw err
  }
}

module.exports.checkForExistingToken = async token => {
  try {
    const result = await Blacklist.findOne({ token }).exec()
    if (result) throw new Error('TOKEN_USED')
    return result
  } catch (err) {
    throw err
  }
}
