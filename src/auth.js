/*
auth.js

Spotify Authentication service.
Uses spotify-wrapper to get user auth access/refresh tokens
*/

const { authCodeGrant, getAuthorizeURL } = require('./spotify-wrapper')

const getAuthURL = () => {
  return getAuthorizeURL()
}
const authSpotify = (authCode) => {
  return new Promise((resolve, reject) => {
    const auth = authCodeGrant(authCode)
    auth.then(data => {
      //console.log(data.body)
      resolve(data)
    })
    auth.catch(err => {
      console.error(err)
      reject(err)
    })
  })
}

module.exports = { getAuthURL, authSpotify }
