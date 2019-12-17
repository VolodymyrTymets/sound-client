const { spawn } = require('child_process');
const ss = require('socket.io-stream');
const { onMicRate } = require('./mic-level');
const { onRLNNotify } = require('./RLN-notigy');
const { socketClients } = require('../utils/SocketClients');

let lastStream = null;

const initControllers = (config, io) => {
    io.on('connection', client => {
        console.log('[Socket] --> client is connected.', client.id);
        socketClients.setClient(client);
        const micInputStream = global.mic.getMicInputStream();
        // send mic stream to client
        const stream = ss.createStream();
        if(lastStream) {
          micInputStream && micInputStream.unpipe(lastStream);
        }
        lastStream = stream;
        micInputStream && micInputStream.pipe(stream);

        ss(client).emit('mic-stream', stream, { mic: {
                rate: config.mic.rate,
                channels: config.mic.channels,
                device: config.mic.device,
            },
            minRateDif: config.spectrumWorker.minRateDif,
            maxRateDif: config.spectrumWorker.maxRateDif,
            minBreathTime: config.notifier.minBreathTime
        });

        // actions
        client.on('micRate', onMicRate(config));
        client.on('rln-type', onRLNNotify(config));

        // disconnect
        client.on('disconnect', () => {
            socketClients.removeClient(client);
        });
    });
};

module.exports = { initControllers };
