const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: String,
  access_token: String,
  refresh_token: String,
  expires_in: Number,
  refresh_date: Date
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
