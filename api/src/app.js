const NODE_ENV = process.env.NODE_ENV

// Load in environment variables
// Visit dotenv for more configuration settings
if (NODE_ENV === 'development') {
  require('dotenv').config({
    path: './src/config/development.env'
  })
}


const express = require('express')
const app = express()
const cors = require('cors')
const {
  port,
  corsOptions
} = require('../src/config/default')
const responder = require('./helpers/global.helper.responder')

// Bring in database connection
try {
  console.log('Attempting to establish database connection...')
  require('./services/database')
} catch (err) {
  throw err
}

// Setup morgan to log all incoming requests
// Currently morgan is set to be active while in development mode, this can be changed
if (NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('combined'))
}

app.set('PORT', port)
app.use(express.json())
app.use(cors(corsOptions))
app.use(
  express.urlencoded({
    extended: true
  })
)

// Register a custom middleware that handles response objects
app.use(responder())
// Import modules here
require('./modules/index').modules(app)

app.get('/', (req, res) => {
  res.json({
    message: 'Backend service for FCUC-HRMS'
  })
})

// Export app to server.js
module.exports = app