const ss = require('socket.io-stream');

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
      minBreathTime: config.notifier.minBreathTime
    });
    client.on('disconnect', () => {});
  });
};

module.exports = { onMicStream };
