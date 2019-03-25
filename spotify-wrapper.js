const SpotifyWebApi = require('spotify-web-api-node')

const scopes =
    ['user-top-read', 'playlist-read-private', 'playlist-modify-private'];

const redirectUri = 'http://localhost:8888/auth', state = 'newboy'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri
});

const getAuthorizeURL = () => {
  var url = spotifyApi.createAuthorizeURL(scopes, state)
  return url;
};

const authSpotify = (authCode) => {
  // Retrieve an access token and a refresh token
  return new Promise((resolve, reject) => {
    spotifyApi.authorizationCodeGrant(authCode).then(
        function(data) {
          // Set the access token on the API object to use it in later
          // calls
          spotifyApi.setAccessToken(data.body['access_token'])
          spotifyApi.setRefreshToken(data.body['refresh_token'])
          resolve('Authorized')
        },
        function(err) {
          reject('Something went wrong!')
          console.log('Something went wrong!', err)
        });
  });
};

const getTopTracks = () => {
  const options = {time_range: 'short_term', limit: 5, offset: 0};
  return new Promise((resolve, reject) => {
    spotifyApi.getMyTopTracks(options).then(
        function(data) {
          var uris = data.body.items.map(i => i.uri)
          console.log('Got top tracks!')
          resolve(uris)
        },
        function(err) {
          console.log('Couldn\'t fetch your top tracks!', err)
          reject(err)
        });
  })
};
/*
Get traits of tracks
*/

const getFeatures = (tracks) => {
  return spotifyApi.getAudioFeaturesForTracks(tracks)
};
/*
Get recommendations based off tracks
*/
const getRecommendations = async (tracks) => {
  tracks = tracks.map(track => track.split(':')[2])
  // const features = await getFeatures(tracks)
  const res = await spotifyApi.getRecommendations(
      {limit: 5, seed_tracks: tracks, target: {popularity: 100}})
  var uris = res.body.tracks.map(i => i.uri)
  return uris;
};

const addTracksToPlaylist = (playlist, tracks) => {
  spotifyApi.addTracksToPlaylist(
      playlist, tracks, {position: 0}, (err, data) => {
        if (err) {
          console.error(err)
        } else {
          console.log('Added top tracks to Nu playlist!');
        }
      })
};

module.exports = {
  getAuthorizeURL,
  authSpotify,
  addTracksToPlaylist,
  getTopTracks,
  getRecommendations
}