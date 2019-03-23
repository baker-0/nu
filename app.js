const dotenv = require('dotenv').config()
const path = require('path');
const express = require("express");
const SpotifyWebApi = require('spotify-web-api-node');
const port = 8888;
const app = express();
app.use(express.static("public"));

var scopes = ['user-top-read', 'playlist-read-private', 'playlist-modify-private'],
    redirectUri = 'http://localhost:8888/callback',
    state = 'new boy';

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: redirectUri
  });

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
app.get('/callback', function(req, res) {
    console.log("Spotify authorized!")

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(req.query.code).then(
        function(data) {
            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            res.redirect('/test')
        },
        function(err) {
            console.log('Something went wrong!', err);
        }
    );
})

app.get('/test', function(req, res) {
    const options = {
        time_range: 'short_term',
        limit: 1,
        offset: 5
    };
    spotifyApi.getMyTopTracks(options).then(
        function(data) {
            const playlistId = '6XEJRHzghjdBwi2BCaLfhE'
            var userId;
            spotifyApi.getMe().then(
                function(user) {
                    userId = user.body.id
                    console.log(userId)
                },
                function(err) {
                    console.error(err)
                }
            );

            console.log(data.body.items[0].uri)
            // spotifyApi.addTracksToPlaylist(userId, playlistId, [data.body.items[0].uri]).then(
            //     function(d) {
            //         console.log("Added " + data.body.items[0].uri + " to playlist")
            //     },
            //     function(err) {
            //         console.log("Didn't add " + data.body.items[0].uri + " to playlist")

            //         console.error(err)
            //     }
            // )
            spotifyApi.getPlaylist("12146239041", "6XEJRHzghjdBwi2BCaLfhE").then(
                function(data) {
                    console.log(data.body.items)
                },
                function(err) {
                    console.error(err)
                }
            )
        },
        function(err) {
            console.log("Couldn't fetch your top tracks!", err);
        }
    );
})
app.get('/spotify', function(req, res) {
    res.redirect(authorizeURL);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))