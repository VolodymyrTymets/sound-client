const { spawn } = require('child_process');
const { notify } = require('../utils/notifier/notify');
const { NERVE, MUSCLE } = require('../constants');

const onRLNNotify = () => ({ type }) => {
  if(type === NERVE) {
    notify.nerveNotify();
  }
  if(type === MUSCLE) {
    notify.muscleNotify()
  }
};

module.exports = { onRLNNotify };