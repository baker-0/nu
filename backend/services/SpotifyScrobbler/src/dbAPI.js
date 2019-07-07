const mongoose = require('mongoose')

let UserModel = mongoose.model('User', new mongoose.Schema({}));

const getUsers = (query) => {
  return UserModel.find(query || {})
}

module.exports = { getUsers }
