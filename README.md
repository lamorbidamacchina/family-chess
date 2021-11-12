# family-chess
just a basic multiplayer chessboard to learn socket.io

# references
Basic app
https://www.youtube.com/watch?v=Isfqigjo7fQ&ab_channel=MidwestJS
https://github.com/dwcares/RealTimeWeb-HOL

Chessboard UI
https://chessboardjs.com/

Chess logic
https://github.com/jhlywa/chess.js/blob/master/LICENSE

# local
Run locally with:
npm start

# deploy on heroku
- create new app
- login to heroku cli
- heroku features:enable http-session-affinity -a NAME_OF_THE_APP
- deploy

# todo
- show how many users are connected
- make it mobile friendly, see https://github.com/oakmac/chessboardjs/issues/160
- add a function to recover from a previous fen in case of lost connection
- create different rooms for players
