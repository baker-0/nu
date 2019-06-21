const mongoose = require('mongoose')
const userSchema = require('./user')

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://db:27017/mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const UserModel = mongoose.model('Person', userSchema)

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

module.exports = { insertUser }
