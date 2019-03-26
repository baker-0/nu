/*
controller.js
Handles app routes
*/

const {
  getAuthorizeURL,
  authSpotify,
  addTracksToPlaylist,
  getTopTracks,
  getRecommendations,
  generateTracks
} = require('./spotify-wrapper')

const loginController = (req, res) => {
  var authorizeURL = getAuthorizeURL()
  res.redirect(authorizeURL)
}

const authController = async (req, res) => {
  try {
    await authSpotify(req.query.code)
    res.redirect('/test')
  } catch (err) {
    console.error(err)
    res.redirect('/')
  }
}

const testController = (req, res) => {
  res.redirect('/')
  generateTracks(1, 10).catch(err => console.error(err))
}

module.exports = {
  loginController,
  authController,
  testController
}
