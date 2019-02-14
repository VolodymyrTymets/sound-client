const { config } = require('../../config');
const { NERVE, MIC, MUSCLE } = require('../../constants');
const { wavFileNotifier } = require('./file-notify');

let micOut = null;
let nerveOut = null;
let muscleOut = null;

try {
  const Gpio = require('onoff').Gpio;
  micOut = new Gpio(config.gpio.mic, 'out');
  nerveOut = new Gpio(config.gpio.nerve, 'out');
  muscleOut = new Gpio(config.gpio.muscle, 'out');
} catch (err) {
  console.log('Error -> GPIO is not detected!!!');
}

class Notifier {
	constructor() {
		this._gpio = {
			mic: micOut,
			nerve: nerveOut,
			muscle: muscleOut,
		};
		this._lastNotificationDate = null;
		this._gpioNotify = this._gpioNotify.bind(this);
	}

	_gpioNotify(name, value){
    this._gpio[name] && this._gpio[name].writeSync(value);
	}

	nerveNotify() {
    this._lastNotificationDate = this._lastNotificationDate || new Date().getTime();
    const diff = (new Date().getTime() - this._lastNotificationDate);
    if(diff >= (config.notifier.minBreathTime)) {
      this._gpioNotify(NERVE, 1);
      this._gpioNotify(MUSCLE, 0);
      wavFileNotifier.notify();
    }
	}
  muscleNotify() {
    this._gpioNotify(MUSCLE, 1);
    this._gpioNotify(NERVE, 0);
    this._lastNotificationDate = null;
  }
  gpioOff() {
    this._gpioNotify(MUSCLE, 0);
    this._gpioNotify(NERVE, 0);
    this._gpioNotify(MIC, 0);
  }
  micNotify(value) {
    this._gpioNotify(MIC, value);
  }
  clear() {
    this._gpio.mic && this._gpio.mic.unexport();
    this._gpio.nerve && this._gpio.nerve.unexport();
    this._gpio.muscle && this._gpio.muscle.unexport();
  }
}

const notify = new Notifier();

module.exports = { notify };
