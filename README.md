# Nu (music)

Playlist generator and Spotify listening history exploration tool.

## How to run development environment
Fill `backend/.env.template` and `frontend/.env.template` with appropriate values.
```
 mv ./backend/.env.template ./backend/.env
 mv ./frontend/.env.template ./frontend/.env 
 docker-compose up
```
## TODO

- Backend
  - Refresh Spotify access_token if time to expiration is less than 30s.

- Frontend
  - Display user's top tracks, and make it fancy.
