/*
app.js

High level app routes
*/

require('dotenv').config()
const express = require('express')
const { loginController,
  authController,
  testController } = require('./controller.js')
const cors = require('cors')
const app = express()
const corsOptions = {
  origin: true
}
app.use(express.static('public'))

app.get('/login', cors(corsOptions), loginController)

app.get('/auth', authController)

app.get('/test', testController)

module.exports = app
