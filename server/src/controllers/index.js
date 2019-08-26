const { spawn } = require('child_process');
const ss = require('socket.io-stream');
const { onMicRate } = require('./mic-level');
const { onRLNNotify } = require('./RLN-notigy');

const initControllers = (config, io) => {
    io.on('connection', client => {
        console.log('[Socket] --> client is connected.');

        // send mic stream to client
        const stream = ss.createStream();
        const micInputStream = global.mic.getMicInputStream();
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

        // actions
        client.on('micRate', onMicRate(config));
        client.on('rln-type', onRLNNotify(config));
    });
};

module.exports = { initControllers };
