const http = require('http');
const ss = require('socket.io-stream');
const express = require('express');
const app = express();

const { micInputStream } = require('./src/mic');
const PORT = 3001;
const micConfig = {
  rate: 44100,
  channels: 2,
  debug: false,
  exitOnSilence: 6,
  device: 'pwd:1',
};


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.set('port', PORT);

const server = http.createServer(app, console.log);
const io = require('socket.io').listen(server, {
  log: false,
  agent: false,
  origins: '*:*',
  transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

io.on('connection', client => {
  console.log('----> connect')
  const stream = ss.createStream();
  ss(client).emit('mic-stream', stream, { micConfig });
  micInputStream.pipe(stream);
  client.on('disconnect', () => {});
});

server.listen(PORT, function () {
  console.log('Example app listening on port 3001!');
});
