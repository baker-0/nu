/*
controller.js

Handles app routes.
Uses auth recommendation services
*/

const authAPI = require('./auth.js')
const jwtSign = require('jsonwebtoken')
const dbAPI = require('./dbAPI')
const spotifyAPI = require('./spotify-wrapper')
const webURL = process.env.WEB_URL
const apiURL = process.env.API_URL

const setUserTokens = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await dbAPI.findUser(userId)

      spotifyAPI.setAccessToken(user.access_token)
      spotifyAPI.setRefreshToken(user.refresh_token)
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
  try {
    let user = await setUserTokens(req.user.userID)
    let tracks = await spotifyAPI.getTopTracks('short_term')
    res.status(200).json(tracks)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

const auth = (req, res) => {
  let authorizeURL = authAPI.getAuthURL()
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
    const auth = authAPI.authSpotify(req.query.code)
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
