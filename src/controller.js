/*
controller.js

Handles app routes.
Uses auth recommendation services
*/

const {
  generateTracks
} = require('./recommendations')
const {
  getAuthURL,
  authSpotify
} = require('./auth.js')

const loginController = (req, res) => {
  var authorizeURL = getAuthURL()
  res.json({
    'authURL': authorizeURL
  })
}

const authController = (req, res) => {
  console.log('req.body.code :', req.body.code);
  const auth = authSpotify(req.body.code)
  auth.then((data) => res.json({
    'auth': data
  }))
  auth.catch(() => {
    res.status(401).send('get good')
  })
}

const testController = (req, res) => {
  res.redirect('/')
  generateTracks({
      limit: 5
    })
    .catch(err => console.error(err))
}

module.exports = {
  loginController,
  authController,
  testController
}