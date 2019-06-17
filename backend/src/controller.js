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
  // redirect user to spotify authorization if code query undefined
  if (req.query.code === undefined) {
    return res.redirect('/auth/spotify')
  }
  try {
    const auth = authAPI.authSpotify(req.query.code)
    auth.then((data) => res.json(data))
    auth.catch(() => {
      res.status(401).send('get good')
    })
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports = { auth, redirect }
