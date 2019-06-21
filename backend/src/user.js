const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  access_token: String,
  refresh_token: String
})

module.exports = userSchema
