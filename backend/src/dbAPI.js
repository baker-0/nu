const mongoose = require('mongoose')
const UserModel = require('./user')

const insertUser = (userCredentials) => {
  return new Promise((resolve, reject) => {
    let newUser = new UserModel({
      access_token: userCredentials.access_token,
      refresh_token: userCredentials.refresh_token,
      expires_in: userCredentials.expires_in,
      refresh_date: new Date()
    })

    newUser.save((err, user) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('following user was saved:', user)
        resolve(user)
      }
    })
  })
}

const findById = (userId) => {
  return new Promise((resolve, reject) => {
    UserModel.findById(userId, (err, user) => {
      if (err || user === null) {
        return reject(err || 'User not found!')
      }
      console.log('found user:', user)
      resolve(user)
    })
  })
}

const findByIdAndUpdate = (userId, update) => {
  return new Promise((resolve, reject) => {
    UserModel.findByIdAndUpdate(userId, update, { useFindAndModify: false }, (data) => {
      if (data) {
        console.log('Updated user:', data)
        return resolve(data)
      }
      reject(new Error(`Could not find user with id "${userId}"`))
    })
  })
}

module.exports = { insertUser, findById, findByIdAndUpdate }
