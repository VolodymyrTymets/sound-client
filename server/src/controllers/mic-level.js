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

const onMicRate = config => ({ micRate }) => {
  const { mic, DEBUG_MODE } = config;
  DEBUG_MODE && console.log('set ----> ', `amixer -c ${mic.card} set ${mic.micDeviceName} ${micRate}%`)
  spawn('amixer', ['-c', mic.card, 'set', mic.micDeviceName, `${micRate}%`])
      .stdout.on('data', (data) => {
    DEBUG_MODE && console.log('[setMicLevel]', data.toString())
  });
};

module.exports = { onMicRate };