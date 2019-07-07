/*
recommendations.js

Recommendation service.
Uses spotify-wrapper to operate on user's spotify account
*/
const {
  getTopTracks,
  getSeedTracks,
  getRecommendations,
  addTracksToPlaylist,
  getNuPlaylist
} = require('./spotify-wrapper')

/*
 * generateSeedTracks - Internal function 
 *
 * @playlistID: optional. if passed, seeds are pulled from playlist
 *              with id $playlistID
 */
const generateSeedTracks = async (playlistId) => {
  // empty initially
  var seedTracks = []
  if (playlistId) {
    seedTracks = await getSeedTracks(playlistId)
  }
  // if seedTracks is too small, get tracks from listening history
  if (seedTracks.length < 5) {
    seedTracks = seedTracks.concat(await getTopTracks())
  }
  return seedTracks.slice(0, 5)
}

/*
 * generateTracks - Add new music to user's playlist
 *
 * @limit: number of tracks to add
 * @popularity: popularity of tracks
 */
const generateTracks = ({ limit = 20, popularity = 100 } = {}) => {
  return new Promise(async (resolve, reject) => {
    var seedTracks, recommendations, snapshot
    try {
      const playlistId = await getNuPlaylist()
      seedTracks = await generateSeedTracks()
      recommendations = await getRecommendations(seedTracks, limit, popularity)
      snapshot = await addTracksToPlaylist(playlistId, recommendations)
      console.log('Added tracks to playlist!')
      resolve(snapshot)
    } catch (err) {
      console.error("Couldn't generate tracks")
      reject(err)
    }
  })
}

module.exports = { generateTracks }
