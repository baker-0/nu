const SpotifyWebApi = require('spotify-web-api-node')

const scopes =
  ['user-top-read', 'playlist-read-private', 'playlist-modify-private', 'playlist-modify-public']

const redirectUri = 'http://localhost:8888/auth'
const state = 'newboy'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri
});

const getAuthorizeURL = () => {
  var url = spotifyApi.createAuthorizeURL(scopes, state)
  return url
};

const authSpotify = (authCode) => {
  // Retrieve an access token and a refresh token
  return new Promise((resolve, reject) => {
    spotifyApi.authorizationCodeGrant(authCode).then(
      function (data) {
        // Set the access token on the API object to use it in later
        // calls
        spotifyApi.setAccessToken(data.body['access_token'])
        spotifyApi.setRefreshToken(data.body['refresh_token'])
        resolve('Authorized')
      },
      function (err) {
        reject(err)
        console.log('Something went wrong!', err)
      })
  })
}

const getTopTracks = () => {
  const options = { time_range: 'short_term', limit: 5, offset: 0 }
  return new Promise((resolve, reject) => {
    spotifyApi.getMyTopTracks(options).then(
      function (data) {
        var uris = data.body.items.map(i => i.uri)
        resolve(uris)
      },
      function (err) {
        console.log('Couldn\'t fetch your top tracks!', err)
        reject(err)
      })
  })
}
/*
Get traits of tracks
*/

const getFeatures = (tracks) => {
  return spotifyApi.getAudioFeaturesForTracks(tracks)
}
/*
Get recommendations based off tracks
*/
const getRecommendations = async (tracks, limit, popularity) => {
  tracks = tracks.map(track => track.split(':')[2])
  const res = await spotifyApi.getRecommendations(
    { limit: limit, seed_tracks: tracks, target: { popularity: popularity } })
  var uris = res.body.tracks.map(i => i.uri)
  console.log(res.body.tracks.map(i => i.name))
  return uris
}

const addTracksToPlaylist = (playlist, tracks) => {
  return spotifyApi.addTracksToPlaylist(playlist, tracks, { position: 0 })
}

/*
 * generateTracks - Add new music to user's playlist
 *
 * @limit: number of tracks to add
 * @popularity: popularity of tracks
 */
const generateTracks = (limit = 20, popularity = 100) => {
  const playlistId = '6XEJRHzghjdBwi2BCaLfhE'
  return new Promise(async (resolve, reject) => {
    var topTracks, recommendations, snapshot
    try {
      topTracks = await getTopTracks()
      recommendations = await getRecommendations(topTracks, limit, popularity)
      snapshot = await addTracksToPlaylist(playlistId, recommendations)
      console.log('Added tracks to playlist!');
      resolve(snapshot)
    } catch (err) {
      console.error("Couldn't generate tracks")
      reject(err)
    }
  })
}
module.exports = {
  getAuthorizeURL,
  authSpotify,
  addTracksToPlaylist,
  getTopTracks,
  getRecommendations,
  generateTracks
}