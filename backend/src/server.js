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

// Client browser should be directed to this endpoint to login using spotify
app.get('/auth/spotify', serverAPI.auth)

// Spotify redirects to this endpoint after grabbing user's credentials.
// Credentials are saved and the user is redirected to the home page
app.get('/auth/redirect', serverAPI.redirect, serverAPI.welcome)

app.get('/*', function (req, res) {
  console.log('In general handler')

  res.sendFile('index.html', {
    root: path.join(__dirname, '../../frontend/build')
  })
})

module.exports = app
