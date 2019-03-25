/*
controller.js
Handles app routes
*/

const {
  getAuthorizeURL,
  authSpotify,
  addTracksToPlaylist,
  getTopTracks,
  getRecommendations
} = require('./spotify-wrapper');

const loginController = (req, res) => {
  var authorizeURL = getAuthorizeURL();
  res.redirect(authorizeURL)
};

const authController = async (req, res) => {
  try {
    await authSpotify(req.query.code)
  } catch (err) {
    console.error(err)
    res.redirect('/')
    return
  }
  res.redirect('/test')

  console.log('Spotify authorized!')
};

const testController = async (req, res) => {
  res.redirect('/');

  const playlistId = '6XEJRHzghjdBwi2BCaLfhE';
  var topTracks
  try {
    topTracks = await getTopTracks();
  } catch (err) {
    console.error(err);
    return
  }
  const recommendations = await getRecommendations(topTracks);
  console.log(recommendations);
  addTracksToPlaylist(playlistId, recommendations);
};

module.exports = {
  loginController,
  authController,
  testController
};
