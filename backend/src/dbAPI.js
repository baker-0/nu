const mongoose = require('mongoose')
const UserModel = require('./user')

// Inserts user into DB.
// If user already exists in DB, update.
const insertUser = (userId, data) => {
  return new Promise((resolve, reject) => {
    const query = { id: userId }
    const update = {
      id: userId,
      refresh_date: new Date()
    }
    if (data.access_token) update['access_token'] = data.access_token
    if (data.refresh_token) update['refresh_token'] = data.refresh_token
    if (data.expires_in) update['expires_in'] = data.expires_in

    const options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false }

    // Find the document
    UserModel.findOneAndUpdate(query, update, options, (error, result) => {
      if (error) return reject(error)
      resolve(result)

      console.log('following user was saved:', result)
    })
  })
}

const findById = (userId) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ id: userId }, (err, user) => {
      if (err || user === null) {
        return reject(err || `User ${userId} not found!`)
      }
      console.log('found user:', user)
      resolve(user)
    })
  })
}

module.exports = { insertUser, findById }
