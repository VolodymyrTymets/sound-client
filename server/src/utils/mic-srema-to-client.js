const { spawn } = require('child_process');
const ss = require('socket.io-stream');
const { micLevelListen } = require('./mic-level');

const onMicStream = (config, io) => (micInputStream) => {
  io.on('connection', client => {
    console.log('[Socket] --> client is connected.');
    const stream = ss.createStream();
    micInputStream.pipe(stream);
    ss(client).emit('mic-stream', stream, { mic: {
        rate: config.mic.rate,
        channels: config.mic.channels,
        device: config.mic.device,
      },
      minRateDif: config.spectrumWorker.minRateDif,
      maxRateDif: config.spectrumWorker.maxRateDif,
      minBreathTime: config.notifier.minBreathTime
    });
    client.on('disconnect', () => {});

    micLevelListen(client, config);
  });
};

module.exports = { onMicStream };
