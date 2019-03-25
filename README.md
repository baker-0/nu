# Nu (music)
GOOD music generator.

## TODO

### Short term
- Create User Abstraction
  - User has access/refresh tokens
  - Also has playlist ID of user's Nu playlist.
    - If playlist ID invalid, create Nu playlist.
- Check validity of access token on every call to the API. If expired, refresh.
### Long term
- Deploy app on server, run regularly to generate recommendations.