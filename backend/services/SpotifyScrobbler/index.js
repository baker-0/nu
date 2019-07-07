const dbURI = 'mongodb://db:27017/mongo'
require('./src/dbDriver').connect(dbURI)
const dbAPI = require('./src/dbAPI')
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
})

const scrobble = async () => {
  try {
    let users = await dbAPI.getUsers()
    console.log(users);
  } catch(err) {
    console.log(users);
  }
}

scrobble();