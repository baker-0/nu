/*
app.js

High level app routes
*/

require('dotenv').config()
const express = require('express')
const { loginController,
  authController,
  testController } = require('./controller.js')

const app = express()

app.use(express.static('public'))

app.get('/login', loginController)

app.get('/auth', authController)

app.get('/test', testController)

module.exports = app
