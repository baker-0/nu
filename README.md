# Nu (music)

Playlist generator and Spotify listening history exploration tool.

## TODO

- Create simple landing page with "connect to spotify" button.
  - Button should redirect user to Spotify authentication.
  - Once authenticated, user is redirected back to Nu
  - Authentication details should be cached locally on the user's machine.
  - If auth details are found, load UI instead of landing page.
- Create simple UI to load after user authorizes access to their Spotify account.
  - Display user's top tracks.
  - Create button to generate tracks based on top tracks.
- Check validity of access token on every call to the API. If expired, refresh.
