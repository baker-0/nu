/*
controller.js

Handles app routes.
Uses auth recommendation services
*/

const jwtSign = require('jsonwebtoken')
const dbAPI = require('./dbAPI')
const spotifyAPI = require('./spotify-wrapper')
const webURL = process.env.WEB_URL
const apiURL = process.env.API_URL

const refreshUserToken = (user) => {
  return new Promise(async (resolve, reject) => {
    console.log('refreshUserToken:', user)
    try {
      let tokenObj = await spotifyAPI.refreshAccessToken()
      let updatedUser = await dbAPI.findByIdAndUpdate(user._id, {
        'access_token': tokenObj.access_token,
        'expires_in': tokenObj.expires_in,
        'refresh_date': new Date()
      })
      console.log('in refreshUserToken, updatedUser is:', updatedUser)
      resolve(updatedUser)
    } catch (err) {
      reject(err)
      console.log(err)
    }
  })
}

const setUserTokens = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await dbAPI.findById(userId)
      spotifyAPI.setRefreshToken(user.refresh_token)

      // Refresh access_token if it is 30 seconds (or less) away from expiring.
      let tokenAge = (new Date() - user.refresh_date) / 1000
      if (tokenAge >= user.expires_in - 30) {
        user = await refreshUserToken(user)
      }

      // set access_token after ensuring validity
      spotifyAPI.setAccessToken(user.access_token)
      resolve(user)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

const isAuthenticated = (req, res, next) => {
  if (req.user) return next()
  res.sendStatus(401)
}

const topTracks = async (req, res) => {
  const options = {
    time_range: 'short_term',
    limit: 5,
    offset: 0
  }
  try {
    await setUserTokens(req.user.userID)
    let tracks = await spotifyAPI.getMyTopTracks(options)
    res.status(200).json(tracks)
  } catch (err) {
    console.log(err)
    res.sendStatus(401)
  }
}

const auth = (req, res) => {
  const scopes =
  ['user-top-read']
  const state = 'new'
  let authorizeURL = spotifyAPI.createAuthorizeURL(scopes, state)
  res.redirect(authorizeURL)
}

const welcome = (req, res) => {
  if (req.token) {
    res.redirect(`${webURL}/authorized?token=${req.token}`)
  } else {
    res.redirect('/auth/spotify')
  }
}

const redirect = (req, res, next) => {
  // redirect request to spotify authorization if code query undefined
  if (req.query.code === undefined) {
    return res.redirect(`${apiURL}/auth/spotify`)
  }
  try { // authenticate spotify
    const auth = spotifyAPI.authorizationCodeGrant(req.query.code)
    auth.then(async (data) => {
      try { // insert user into DB
        const userID = (await dbAPI.insertUser(data.body))._id
        const payload = { 'userID': userID }
        const token = jwtSign.sign(payload, process.env.JWT_SECRET)
        req.token = token
        next()
      } catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
    })
    auth.catch(() => {
      res.status(401).send('get good')
    })
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports = { auth, redirect, welcome, isAuthenticated, topTracks }
