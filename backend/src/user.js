const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  access_token: String,
  refresh_token: String
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
