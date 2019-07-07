const mongoose = require('mongoose')

const connect = (uri) => {
  // Connect to MongoDB
  return mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log('Spotify Scrobbler service connected to MongoDB'))
    .catch(err => console.log(err))
}

module.exports = { connect }
