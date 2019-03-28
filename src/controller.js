/*
controller.js

Handles app routes.
Uses auth recommendation services
*/

const { generateTracks } = require('./recommendations')
const { getAuthURL, authSpotify } = require('./auth.js')

const loginController = (req, res) => {
  var authorizeURL = getAuthURL()
  res.redirect(authorizeURL)
}

const authController = (req, res) => {
  const auth = authSpotify(req.query.code)
  auth.then(() => {
    res.redirect('/test')
  })
  auth.catch(() => {
    res.redirect('/')
  })
}

const testController = (req, res) => {
  res.redirect('/')
  generateTracks({ limit: 5 })
    .catch(err => console.error(err))
}

module.exports = {
  loginController,
  authController,
  testController
}
