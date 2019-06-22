require('dotenv').config()
const serverAPI = require('./serverAPI')
const express = require('express')
const jwt = require('express-jwt')
const cors = require('cors')
const app = express()
const path = require('path')
app.use(express.json())
app.use(cors())

app.get('/user/top/tracks',
  jwt({ secret: process.env.JWT_SECRET }),
  serverAPI.topTracks)

app.get('/auth/spotify', serverAPI.auth)

app.get('/auth/redirect', serverAPI.redirect, serverAPI.welcome)

app.get('/*', function (req, res) {
  console.log('In general handler')

  res.sendFile('index.html', {
    root: path.join(__dirname, '../../frontend/build')
  })
})

module.exports = app
