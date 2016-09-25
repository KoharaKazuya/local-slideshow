'use strict';

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
const fileServer = new nodeStatic.Server('./public', { gzip: true });

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
  const requestUrl = url.parse(req.url)
  const pathname = requestUrl.pathname;
  reqLogger.info(`header: ${ CircularJSON.stringify(req.headers) }`);

  if (req.method === 'GET' && pathname.match(/^\/rooms\/\d+/)) {
    const roomId = Number(pathname.match(/^\/rooms\/(\d+)/)[1]);

    if (isRoomExist(roomId)) {
      res.writeHead(200);
      res.end(CircularJSON.stringify(rooms[roomId]));
    } else {
      res.writeHead(404);
      res.end('page not found');
    }

  } else if (req.method === 'GET' && pathname.match(/^\/slides\/\d+/)) {
    const roomId = Number(pathname.match(/^\/slides\/(\d+)/)[1]);
    appLogger.debug('TODO: Implement ' + roomId);
  } else if (req.method === 'GET' && pathname.match(/^\/controller\/\d+/)) {
    const roomId = Number(pathname.match(/^\/controller\/(\d+)/)[1]);
    appLogger.debug('TODO: Implement ' + roomId);
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
      socket.send({ type: 'ROOM_JOINED', roomId });

      // 部屋を作ったので、コネクションが閉じたときに部屋を消すように
      socket.on('disconnect', () => {
        actLogger.debug('destroy room: ' + roomId);
        delete rooms[roomId];
      });
    }

    if (message.type === 'JOIN_ROOM') {
      if (!isRoomExist(message.roomId)) {
        actLogger.debug('room not found: ' + message.roomId);
        return;
      }

      roomId = message.roomId;
      socket.join(roomId);

      actLogger.debug('send ROOM_JOINED ' + roomId);
      socket.send({ type: 'ROOM_JOINED', roomId });
    }

    if (message.type === 'PAGE_CONTROL' && typeof roomId === 'number') {
      io.to(roomId).send({ type: 'PAGE_CONTROL', action: message.action });
    }
  });
});
