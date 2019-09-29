const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

//const { micInputStream } = require('./src/mic');
const { config } = require('./src/config');
const { onStart } = require('./src/onStart');
// api
app.get('/api/v1/ping', (req, res) => {
  console.log('----> /api/v1/ping')
  res.send({ success: true });
});

app.use(express.static(path.resolve(__dirname, './public/build-ios/')));
app.use(express.static(path.resolve(__dirname, './public/build/')));
app.use(express.static(path.resolve(__dirname, './public/assets/')));
app.get('/ios', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/build-ios/', './index.html'));
});
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

// tun nerve recognize alg
onStart(config, io);

server.listen(config.port, function () {
  console.log('Example app listening on port 3001!');
});
