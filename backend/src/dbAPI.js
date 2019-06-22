const mongoose = require('mongoose')
const UserModel = require('./user')

const insertUser = (userCredentials) => {
  return new Promise((resolve, reject) => {
    let newUser = new UserModel({
      access_token: userCredentials.access_token,
      refresh_token: userCredentials.refresh_token
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

const findUser = (userId) => {
  return new Promise((resolve, reject) => {
    UserModel.findById(userId, (err, user) => {
      if (err) {
        reject(err)
        return
      }
      console.log('found user:', user)
      resolve(user)
    })
  })
}

module.exports = { insertUser, findUser }
