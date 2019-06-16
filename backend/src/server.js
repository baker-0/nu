require('dotenv').config()
const serverAPI = require('./controller')
const express = require('express')
const jwt = require('express-jwt')
const cors = require('cors')
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.get('/auth/spotify', serverAPI.auth)

app.get('/auth/redirect', serverAPI.redirect)

module.exports = app
