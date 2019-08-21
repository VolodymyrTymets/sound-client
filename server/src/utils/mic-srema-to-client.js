const { spawn } = require('child_process');
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
      maxRateDif: config.spectrumWorker.maxRateDif,
      minBreathTime: config.notifier.minBreathTime
    });
    client.on('disconnect', () => {});

    // todo mic refactor
    client.on('micRate', ({ micRate }) => {
      console.log('---->',micRate)
      spawn('amixer', ['-c', 2, 'set', 'Mic', `${micRate}%`]).stdout.on('data', (data) => {
        console.log('----->', data.toString())
      });
    })
  });
};

module.exports = { onMicStream };
