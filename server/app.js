const http = require('http');
const ss = require('socket.io-stream');
const express = require('express');
const path = require('path');
const app = express();

const { micInputStream } = require('./src/mic');
const { config } = require('./src/config');

app.use(express.static(path.resolve(__dirname, './public/build/')));
app.use(express.static(path.resolve(__dirname, './public/assets/')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/build/', './index.html'));
});

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
  micInputStream.pipe(stream);
  ss(client).emit('mic-stream', stream, { mic: {
    rate: config.mic.rate,
    channels: config.mic.channels,
    device: config.mic.device,
  } });
  client.on('disconnect', () => {});
});

server.listen(config.port, function () {
  console.log('Example app listening on port 3001!');
});
