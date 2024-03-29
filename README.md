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

# online demo
https://family-chess.fly.dev/

# local
Run locally with:
npm start

# deploy on heroku
- create new app
- login to heroku cli
- heroku features:enable http-session-affinity -a NAME_OF_THE_APP
- deploy

# todo
- show who is moving next
- display castling realtime (now it shows up on the next move)
- create different rooms for players (https://socket.io/docs/v4/rooms/)
- show how many users are connected (https://socket.io/docs/v4/server-instance/) 
- export/import pgn (https://www.websparrow.org/web/how-to-create-and-save-text-file-in-javascript)

# done
- make it mobile friendly, see https://github.com/oakmac/chessboardjs/issues/160
- add a function to recover from last state in case of closing or loosing connection 
- avoid page scrolling while dragging, on mobile devices: https://stackoverflow.com/questions/9251590/prevent-page-scroll-on-drag-in-ios-and-android (done with css touch-action)
- check on reload (it needs sleep)
- on reload, load the correct side of the keyboard

