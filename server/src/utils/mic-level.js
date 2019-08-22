const { spawn } = require('child_process');


/**
 * to know card name
 * alsamixer
 * f6
 * then
 *          card   name
 * amixer -c 2 set Mic 80%
   amixer -c 2 set Mic 2db // from 0 to 24
 * */
const setMicLevel = (level, config) => {
  const { mic, DEBUG_MODE } = config;
  DEBUG_MODE && console.log('set ----> ', `amixer -c ${mic.card} set ${mic.micDeviceName} ${level}%`)
  spawn('amixer', ['-c', mic.card, 'set', mic.micDeviceName, `${level}%`])
    .stdout.on('data', (data) => {
        DEBUG_MODE && console.log('[setMicLevel]', data.toString())
    });
};

const micLevelListen = (client, config) => {
  client.on('micRate', ({ micRate }) => {
    setMicLevel(micRate, config);
  })
};

module.exports = { micLevelListen };