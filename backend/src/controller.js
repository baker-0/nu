/*
controller.js

Handles app routes.
Uses auth recommendation services
*/

const generateTracks = require('./recommendations')
const authAPI = require('./auth.js')

const auth = (req, res) => {
  let authorizeURL = authAPI.getAuthURL()
  res.redirect(authorizeURL)
}

const redirect = (req, res) => {
  const auth = authAPI.authSpotify(req.query.code)
  auth.then((data) => res.json({
    'auth': data
  }))
  auth.catch(() => {
    res.status(401).send('get good')
  })
}

module.exports = { auth, redirect }
