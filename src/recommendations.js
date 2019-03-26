/*
recommendations.js

Recommendation service.
Uses spotify-wrapper to operate on user's spotify account
*/
const {
  getTopTracks,
  getRecommendations,
  addTracksToPlaylist,
  getNuPlaylist
} = require('./spotify-wrapper')

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
      topTracks = await getTopTracks()
      recommendations = await getRecommendations(topTracks, limit, popularity)
      const playlistId = await getNuPlaylist()
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
