'use strict';

const fs = require('fs');
const log4js = require('log4js');
const url = require('url');
const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const nodeStatic = require('node-static');
const CircularJSON = require('circular-json');

// init loggers
const appLogger = log4js.getLogger('application');
const reqLogger = log4js.getLogger('request');
const actLogger = log4js.getLogger('action');
if (process.env.NODE_ENV === 'production') {
  appLogger.setLevel('INFO');
  reqLogger.setLevel('INFO');
  actLogger.setLevel('INFO');
}

appLogger.info('start to listen 8081');
app.listen(8081);

appLogger.info('static files published from /public');
const fileServer = new nodeStatic.Server('./public');

// room id is [0, 2**24-1] integer
const rooms = {};
function genRoomId() {
  let candidate;
  for (let i=0; i<10000; i++) {
    candidate = Math.floor((1 << 24) * Math.random());
    if (!isRoomExist(candidate)) return candidate;
  }
  appLogger.error('cannot find new unique room id');
  throw new Error('cannot find new unique room id');
}

function isRoomExist(roomId) {
  return Object.keys(rooms).indexOf(String(roomId)) !== -1;
}

function handler(req, res) {
  reqLogger.debug(CircularJSON.stringify(req));
  reqLogger.info(`header: ${ CircularJSON.stringify(req.headers) }`);
  const requestUrl = url.parse(req.url)
  const pathname = requestUrl.pathname;
  const filename = pathname.split('/').slice(-1)[0];
  reqLogger.debug(pathname);
  reqLogger.debug(filename);

  if (req.method === 'GET' && (pathname == '/' || pathname.match(/^\/controller\/\d+$/))) {
    fileServer.serveFile('/index.html', 200, {}, req, res);
  } else if (fs.existsSync('public/' + filename)) {
    fileServer.serveFile('/' + filename, 200, {}, req, res);
  } else {
    // static files
    req.addListener('end', () => fileServer.serve(req, res)).resume();
  }
}

io.on('connection', socket => {
  actLogger.debug('new connection');
  let roomId;  // id of joined room for this socket

  socket.on('message', message => {
    actLogger.debug('[message]: ' + CircularJSON.stringify(message));

    if (message.type === 'NEW_ROOM') {
      roomId = genRoomId();
      socket.join(roomId);
      rooms[roomId] = {};

      appLogger.info('num of room: ' + Object.keys(rooms).length);
      actLogger.debug('send ROOM_JOINED ' + roomId);
      socket.send({ type: 'ROOM_JOINED', payload: { roomId }, meta: {} });

      // 部屋を作ったので、コネクションが閉じたときに部屋を消すように
      socket.on('disconnect', () => {
        actLogger.debug('destroy room: ' + roomId);
        delete rooms[roomId];
      });
    }

    if (message.type === 'JOIN_ROOM') {
      if (!isRoomExist(message.payload.roomId)) {
        actLogger.debug('room not found: ' + message.payload.roomId);
        return;
      }

      roomId = message.payload.roomId;
      socket.join(roomId);

      actLogger.debug('send ROOM_JOINED ' + roomId);
      socket.send({ type: 'ROOM_JOINED', payload: { roomId }, meta: {} });
    }

    if (['NEXT_PAGE_REQUEST', 'PREV_PAGE_REQUEST'].indexOf(message.type) >= 0 && typeof roomId === 'number') {
      const type = message.type.replace(/(.*)_REQUEST/, "$1");
      actLogger.debug('[room message ' + roomId + ']: ' + type);
      io.to(roomId).send({ type , payload: {}, meta: {} });
    }
  });
});
