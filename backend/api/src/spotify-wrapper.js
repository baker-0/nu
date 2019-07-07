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

module.exports = spotifyApi
