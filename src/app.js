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
app.use(express.json())
app.use(cors())
app.get('/login', loginController)

app.post('/auth', authController)

app.get('/test', testController)

module.exports = app
