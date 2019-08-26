const { spawn } = require('child_process');
const { notify } = require('../utils/notifier/notify');
const { NERVE, MUSCLE } = require('../constants');

const onRLNNotify = (config) => ({ type }) => {
  config.DEBUG_MODE && console.log('[GPIO notify] -->', type);
  if(type === NERVE) {
    notify.nerveNotify();
  }
  if(type === MUSCLE) {
    notify.muscleNotify()
  }
};

module.exports = { onRLNNotify };