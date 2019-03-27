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
 * generateSeedTracks
 *
 */
const generateSeedTracks = async (playlistId) => {
  var seedTracks
  if (playlistId) {
    seedTracks = await getSeedTracks(playlistId)
  }
  console.log(seedTracks);
  // if seedTracks is undefined or too small, get tracks from listening history
  if (seedTracks && seedTracks.length < 5) {
    seedTracks = await getTopTracks()
  }
  return seedTracks
}
/*
 * generateTracks - Add new music to user's playlist
 *
 * @limit: number of tracks to add
 * @popularity: popularity of tracks
 */
const generateTracks = ({ limit = 20, popularity = 100 } = {}) => {
  return new Promise(async (resolve, reject) => {
    var topTracks, recommendations, snapshot
    try { 
      const playlistId = await getNuPlaylist()
      topTracks = await generateSeedTracks(playlistId)
      console.log("topTracks: " + topTracks)
      recommendations = await getRecommendations(topTracks, limit, popularity)
      console.log('playlistId :', playlistId);
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
