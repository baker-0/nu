/*
controller.js

Handles app routes.
Uses auth recommendation services
*/

const authAPI = require('./auth.js')
const jwt = require('express-jwt')
const jwtSign = require('jsonwebtoken')
const dbAPI = require('./dbAPI')
const webURL = process.env.WEB_URL
const apiURL = process.env.API_URL

const auth = (req, res) => {
  let authorizeURL = authAPI.getAuthURL()
  res.redirect(authorizeURL)
}

const welcome = (req, res) => {
  if (req.token) {
    res.redirect(`${webURL}/dashboard?token=${req.token}`)
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

module.exports = { auth, redirect, welcome }
