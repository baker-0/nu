/*
spotify-wrapper.js

Wrapper for the wrapper of the Spotify API
*/
const SpotifyWebApi = require('spotify-web-api-node')
const scopes =
  ['user-top-read',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public']
const HOST = process.env.API_URL
const redirectUri = HOST + '/auth/redirect'
const state = 'nu'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri
})
const NuPlaylistName = 'Nu'

const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token)
}

const setRefreshToken = (token) => {
  spotifyApi.setRefreshToken(token)
}

const getAuthorizeURL = () => {
  var url = spotifyApi.createAuthorizeURL(scopes, state)
  return url
}

const authCodeGrant = (authCode) => {
  // Retrieve an access token and a refresh token
  return new Promise((resolve, reject) => {
    spotifyApi.authorizationCodeGrant(authCode).then(
      function (data) {
        // Set the access token on the API object to use it in later
        // calls
        spotifyApi.setAccessToken(data.body['access_token'])
        spotifyApi.setRefreshToken(data.body['refresh_token'])
        resolve(data)
      },
      function (err) {
        reject(err)
      })
  })
}

const getSeedTracks = (playlistID) => {
  return new Promise((resolve, reject) => {
    spotifyApi.getPlaylistTracks(playlistID).then(
      function (data) {
        var oldestFiveTracks = data.body.items.sort((a, b) => {
          a = new Date(a.added_at)
          b = new Date(b.added_at)
          return a > b ? -1 : a < b ? 1 : 0
        }).slice(-5)
        console.log("Using playlist's seed tracks: ");
        console.log(oldestFiveTracks.map(a => a.track.name))
        resolve(oldestFiveTracks.map(a => a.track.uri))
      },
      function (err) {
        console.error(err);
        reject(err)
      }
    )
  })

}
const getTopTracks = (timeRange, limit, offset) => {
  const options = {
    time_range: timeRange || 'short_term',
    limit: limit || 5,
    offset: offset || 0
  }
  return new Promise((resolve, reject) => {
    spotifyApi.getMyTopTracks(options).then(
      function (data) {
        console.log("User's top tracks: ");
        console.log(data.body.items.map(i => i.name))
        resolve(data.body.items)
      },
      function (err) {
        console.log('Couldn\'t fetch your top tracks!', err)
        reject(err)
      })
  })
}

/*
Get recommendations based off tracks
*/
const getRecommendations = async (trackURIs, limit, popularity) => {
  // get song IDs
  var tracks = trackURIs.map(URI => URI.split(':')[2])
  // get recommendations
  const res = await spotifyApi.getRecommendations(
    { limit: limit, seed_tracks: tracks, target: { popularity: popularity } })
  // extract URIs and print names
  var uris = res.body.tracks.map(i => i.uri)
  console.log(res.body.tracks.map(i => i.name))
  return uris
}

/*
 * Get ID of user's Nu playlist
 * If playlist doesn't exist, create it and return ID.
 */
const getNuPlaylist = async () => {
  try {
    var userID = await spotifyApi.getMe()
    userID = userID.body.id
    const playlists = await spotifyApi.getUserPlaylists(userID)
    var playlistData = playlists.body.items.filter(p => p.name === NuPlaylistName && p.owner.id === userID)[0]
    if (!playlistData) {
      playlistData = await spotifyApi.createPlaylist(userID, NuPlaylistName)
      playlistData = playlistData.body
    }
    return playlistData.id
  } catch (err) {
    console.error("Couldn't get Nu playlist ID" + err)
  }
}

const addTracksToPlaylist = (playlist, tracks) => {
  return spotifyApi.addTracksToPlaylist(playlist, tracks, { position: 0 })
}

module.exports = {
  setAccessToken,
  setRefreshToken,
  getAuthorizeURL,
  authCodeGrant,
  addTracksToPlaylist,
  getTopTracks,
  getSeedTracks,
  getRecommendations,
  getNuPlaylist
}
